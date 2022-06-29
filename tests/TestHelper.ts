import { EnvAdapter } from '@/infra/configs/envs'
import { Server } from '@/presentation/api/server'

import axios, { AxiosInstance, AxiosResponse } from 'axios'
import nock from 'nock'

export class TestHelper {
  axiosAPIClient: AxiosInstance
  server: Server | undefined
  static userCredentials = {
    username: '28868259052',
    password: 'asdasd'
  }

  static clientCredentials = {
    clientId: '8d135da4536f3e5ed70aaaa1839c1f93',
    clientSecret: 'DB4A1FE7B45033F8FA2D9DC653543EBFF4440B5DEF4FDF2CE9CC969967D39B5B7D5F55BF5A25AB9FF98EA58ECF1F39733EAFF1FD11A08324A19275AE8E7FC725'
  }

  static userProfile = {
    email: 'teste@teste.com',
    phoneNumber: '5521981787168'
  }

  static fenix = {
    userId: 'BPP_1243a11a-9b9b-4a50-905b-6ee88bea8139'
  }

  constructor () {
    const axiosConfig = {
      baseURL: `http://localhost:${EnvAdapter.http.listenPort}`,
      validateStatus: () => true
    }
    this.axiosAPIClient = axios.create(axiosConfig)
  }

  async startupServer (): Promise<void> {
    this.server = new Server()
    await this.server.startup()
  }

  async shutdownServer (): Promise<void> {
    await this.server?.shutdown()
  }

  async makeRequestToSignInRoute (
    username = TestHelper.userCredentials.username,
    password = TestHelper.userCredentials.password
  ): Promise<AxiosResponse<any>> {
    return await this.axiosAPIClient
      .post('/v2/auth/', {
        username,
        password
      })
  }

  async makeRequestToLoginClientRoute (
    clientId = TestHelper.clientCredentials.clientId,
    clientSecret = TestHelper.clientCredentials.clientSecret
  ): Promise<AxiosResponse<any>> {
    return await this.axiosAPIClient
      .post('/v2/auth/api', {
        client_id: clientId,
        client_secret: clientSecret
      })
  }

  mockFenixServiceSendOtpTokenSuccess (): void {
    nock(EnvAdapter.fenix.otpUrl, {
      allowUnmocked: true,
      reqheaders: {
        Authorization: () => true
      }
    }).post('').reply(200, {
      id: 'b5c100f9-4ce4-46ae-8de3-df5c9b1a72eb',
      contato: '5535999035760'
    }).persist()
  }

  mockFenixServiceValidateOtpTokenSuccess (): void {
    nock(EnvAdapter.fenix.otpUrl, {
      allowUnmocked: true,
      reqheaders: {
        Authorization: () => true
      }
    }).put('').reply(200, {
      valido: true
    }).persist()
  }

  mockAuth0ServiceGetProfileSuccess (): void {
    nock(`https://${EnvAdapter.auth0PasswordCredSettings.authenticationClientOptions.domain}/userinfo`, { allowUnmocked: true }).get('').reply(200, {
      sub: 'auth0|7da937d4-eecf-4e19-9691-48c32607b7b3',
      nickname: 'teste',
      name: 'teste@teste.com',
      picture: 'https://s.gravatar.com/avatar/f51e4e2fffa2eee0b07ffcfaeacfeebf?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2F08.png',
      updated_at: '2021-10-20T17:36:01.373Z',
      email: 'teste@teste.com'
    }).persist()
  }

  mockAuth0ServiceGetUserSuccess (): void {
    nock(`https://${EnvAdapter.auth0PasswordCredSettings.authenticationClientOptions.domain}/api/v2/users/auth0%7C7da937d4-eecf-4e19-9691-48c32607b7b3`, { allowUnmocked: true }).get('', {
      email: 'teste@teste.com',
      phone_number: '5521981787168'
    }).reply(200).persist()
  }

  mockAuth0ServiceSendOtpTokenSuccess (): void {
    nock(`https://${EnvAdapter.auth0PasswordCredSettings.authenticationClientOptions.domain}/passwordless/start`, { allowUnmocked: true }).post('').reply(200).persist()
  }

  mockAuth0ServiceValidateOtpTokenSuccess (): void {
    nock(`https://${EnvAdapter.auth0PasswordCredSettings.authenticationClientOptions.domain}/oauth/token`, { allowUnmocked: true }).post('').reply(200).persist()
  }

  mockCoreInfobipIntegratorServiceSendSmsSuccess (): void {
    nock(EnvAdapter.core.smsIntegratorUrl, { allowUnmocked: true })
      .post('', body => {
        if (!body.messages[0].to) return false
        if (!body.text) return false
        if (!body.requestId) return false
        return true
      }).reply(200).persist()
  }

  cleanAllServicesMocks (): void {
    nock.cleanAll()
  }
}
