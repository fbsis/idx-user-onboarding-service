import { TestHelper } from '@/tests/TestHelper'

jest.setTimeout(15000)

describe('SendOtpTokenRoute', () => {
  const testHelper = new TestHelper()
  const route = '/v2/otp/'
  let accessToken: string

  beforeAll(async () => {
    await testHelper.startupServer()
    // Auth0
    testHelper.mockAuth0ServiceSendOtpTokenSuccess()
    // Fênix
    testHelper.mockFenixServiceSendOtpTokenSuccess()
    const signInResponse = await testHelper.makeRequestToSignInRoute()
    const parsedJson = JSON.parse(signInResponse.data.json)
    console.log(parsedJson)
    accessToken = parsedJson.access_token
  })

  afterAll(async () => {
    await testHelper.shutdownServer()
    testHelper.cleanAllServicesMocks()
  })

  it('should return 400 if payload is not provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route)
    expect(response.status).toBe(400)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 400 if source is not provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, {
        method: 'email',
        userId: 'fake_user_id',
        transactionId: 'fake_transaction_id'
      })
    expect(response.status).toBe(400)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 400 if method is not provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, {
        source: 'auth0',
        userId: 'fake_user_id',
        transactionId: 'fake_transaction_id'
      })
    expect(response.status).toBe(400)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  describe('using Auth0', () => {
    describe('method email', () => {
      it('should return 400 if accessToken is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'auth0',
            method: 'email'
          })
        expect(response.status).toBe(400)
        expect(response.data).toEqual({
          error: expect.any(String)
        })
      })

      it('should return 200 on success', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'auth0',
            method: 'email'
          }, {
            headers: {
              authorization: accessToken
            }
          })
        expect(response.status).toBe(200)
        expect(response.data).toEqual({
          contact: expect.any(String)
        })
      })
    })

    describe('method sms', () => {
      it('should return 400 if accessToken is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'auth0',
            method: 'sms'
          })
        expect(response.status).toBe(400)
        expect(response.data).toEqual({
          error: expect.any(String)
        })
      })

      it('should return 200 on success', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'auth0',
            method: 'sms'
          }, {
            headers: {
              authorization: accessToken
            }
          })
        expect(response.status).toBe(200)
        expect(response.data).toEqual({
          contact: expect.any(String)
        })
      })
    })
  })

  describe('using Fênix', () => {
    describe('method sms', () => {
      it('should return 400 if accessToken is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'fenix',
            method: 'sms',
            userId: TestHelper.fenix.userId,
            fenixToken: 'valid_fenix_token'
          })
        expect(response.status).toBe(400)
        expect(response.data).toEqual({
          error: expect.any(String)
        })
      })

      it('should return 400 if userId is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'fenix',
            method: 'sms',
            fenixToken: 'valid_fenix_token'
          }, {
            headers: {
              authorization: accessToken
            }
          })
        expect(response.status).toBe(400)
        expect(response.data).toEqual({
          error: expect.any(String)
        })
      })

      it('should return 200 on success', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'fenix',
            method: 'sms',
            userId: TestHelper.fenix.userId,
            fenixToken: 'valid_fenix_token'
          }, {
            headers: {
              authorization: accessToken
            }
          })
        expect(response.status).toBe(200)
        expect(response.data).toEqual({
          contact: expect.any(String),
          otpTokenId: expect.any(String)
        })
      })
    })

    describe('method email', () => {
      it('should return 400 if accessToken is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'fenix',
            method: 'email',
            userId: TestHelper.fenix.userId,
            fenixToken: 'valid_fenix_token'
          })
        expect(response.status).toBe(400)
        expect(response.data).toEqual({
          error: expect.any(String)
        })
      })

      it('should return 400 if userId is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'fenix',
            method: 'email',
            fenixToken: 'valid_fenix_token'
          }, {
            headers: {
              authorization: accessToken
            }
          })
        expect(response.status).toBe(400)
        expect(response.data).toEqual({
          error: expect.any(String)
        })
      })

      it('should return 400 if fenixToken is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'fenix',
            method: 'email',
            userId: TestHelper.fenix.userId
          }, {
            headers: {
              authorization: accessToken
            }
          })
        expect(response.status).toBe(400)
        expect(response.data).toEqual({
          error: expect.any(String)
        })
      })

      it('should return 200 on success', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'fenix',
            method: 'email',
            userId: TestHelper.fenix.userId,
            fenixToken: 'valid_fenix_token'
          }, {
            headers: {
              authorization: accessToken
            }
          })
        expect(response.status).toBe(200)
        expect(response.data).toEqual({
          contact: expect.any(String),
          otpTokenId: expect.any(String)
        })
      })
    })
  })
})
