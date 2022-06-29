import { TestHelper } from '@/tests/TestHelper'

jest.setTimeout(15000)

describe('ValidateOtpTokenRoute', () => {
  const testHelper = new TestHelper()
  const route = '/v2/otp/validate'

  beforeAll(async () => {
    await testHelper.startupServer()
    testHelper.mockAuth0ServiceValidateOtpTokenSuccess()
    testHelper.mockFenixServiceValidateOtpTokenSuccess()
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
        method: 'email'
      })
    expect(response.status).toBe(400)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 400 if method is not provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, {
        source: 'auth0'
      })
    expect(response.status).toBe(400)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 400 if token is not provided', async () => {
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

  describe('using Auth0', () => {
    describe('method email', () => {
      it('should return 400 if email is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'auth0',
            method: 'email',
            token: 'any_token'
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
            method: 'email',
            token: 'any_token',
            email: TestHelper.userProfile.email
          })
        expect(response.status).toBe(200)
      })
    })

    describe('method sms', () => {
      it('should return 400 if phoneNumber is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'auth0',
            method: 'sms',
            token: 'any_token'
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
            method: 'sms',
            token: 'any_token',
            phoneNumber: TestHelper.userProfile.phoneNumber
          })
        expect(response.status).toBe(200)
      })
    })
  })

  describe('using Fênix', () => {
    describe('method email', () => {
      it('should return 400 if tokenId is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'fenix',
            method: 'email',
            token: 'any_token',
            fenixToken: 'any_fenix_token'
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
            token: 'any_token'
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
            token: 'any_token',
            tokenId: 'any_token_id',
            fenixToken: 'any_fenix_token'
          })
        expect(response.status).toBe(200)
      })
    })

    describe('method sms', () => {
      it('should return 400 if tokenId is not provided', async () => {
        const response = await testHelper.axiosAPIClient
          .post(route, {
            source: 'fenix',
            method: 'sms',
            token: 'any_token',
            fenixToken: 'any_fenix_token'
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
            method: 'sms',
            token: 'any_token'
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
            token: 'any_token',
            tokenId: 'any_token_id',
            fenixToken: 'any_fenix_token'
          })
        expect(response.status).toBe(200)
      })
    })
  })
})
