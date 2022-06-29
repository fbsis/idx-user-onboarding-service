import { EnvAdapter } from '@/infra/configs/envs'
import { TestHelper } from '@/tests/TestHelper'
import { sign } from 'jsonwebtoken'

jest.setTimeout(15000)

describe('SendSmsRoute', () => {
  const testHelper = new TestHelper()
  const route = '/v2/auth/sms'
  const apiToken = sign({
    gateway_authentication: {
      subject: 'urn:Auth0'
    },
    gateway_authenticatio: {
      audience: 'urn:InfobipSmsGateway'
    }
  },
  EnvAdapter.tokenSecret)
  const payload = {
    recipient: '+1 399 999',
    body: 'Your verification code is: 12345',
    sender: '+1 234 567'
  }
  const bearerToken = `Bearer ${apiToken}`

  beforeAll(async () => {
    await testHelper.startupServer()
    testHelper.mockCoreInfobipIntegratorServiceSendSmsSuccess()
  })

  afterAll(async () => {
    await testHelper.shutdownServer()
  })

  it('should return 403 if apiToken is not provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, payload)
    expect(response.status).toBe(403)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 403 if apiToken is invalid', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, payload, {
        headers: {
          authorization: 'invalid_api_token'
        }
      })
    expect(response.status).toBe(403)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 400 if smsRecipient is not provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, {
        body: 'Your verification code is: 12345',
        sender: '+1 234 567'
      }, {
        headers: {
          authorization: bearerToken
        }
      })
    expect(response.status).toBe(400)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 400 if smsMessage is not provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, {
        recipient: '+1 399 999',
        sender: '+1 234 567'
      }, {
        headers: {
          authorization: bearerToken
        }
      })
    expect(response.status).toBe(400)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 200 on success', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, payload, {
        headers: {
          authorization: bearerToken
        }
      })
    expect(response.status).toBe(200)
    expect(response.data).toEqual(null)
  })
})
