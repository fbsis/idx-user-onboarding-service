import { TestHelper } from '@/tests/TestHelper'

jest.setTimeout(15000)

describe('LoginClientRoute', () => {
  const testHelper = new TestHelper()
  const clientId = TestHelper.clientCredentials.clientId
  const clientSecret = TestHelper.clientCredentials.clientSecret

  beforeAll(async () => {
    await testHelper.startupServer()
  })

  afterAll(async () => {
    await testHelper.shutdownServer()
  })

  describe('/v2/auth/api', () => {
    const route = '/v2/auth/api'

    it('should return 400 if clientId is not provided', async () => {
      const response = await testHelper.axiosAPIClient
        .post(route, new URLSearchParams({
          client_secret: clientSecret
        }))
      expect(response.status).toBe(400)
      expect(response.data).toEqual({
        error: expect.any(String)
      })
    })

    it('should return 400 if password is not provided', async () => {
      const response = await testHelper.axiosAPIClient
        .post(route, new URLSearchParams({
          client_id: clientId
        }))
      expect(response.status).toBe(400)
      expect(response.data).toEqual({
        error: expect.any(String)
      })
    })

    it('should return 200 on success', async () => {
      const response = await testHelper.axiosAPIClient
        .post(route, new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret
        }))
      expect(response.status).toBe(200)
      expect(response.data).toEqual({
        token_type: expect.any(String),
        access_token: expect.any(String),
        expires_in: expect.any(Number)
      })
    })
  })

  describe('/authorizationserver/oauth2/clientcredentials/token', () => {
    const route = '/authorizationserver/oauth2/clientcredentials/token'

    it('should return 400 if clientId is not provided', async () => {
      const response = await testHelper.axiosAPIClient
        .post(route, new URLSearchParams({
          client_secret: clientSecret
        }))
      expect(response.status).toBe(400)
      expect(response.data).toEqual({
        error: expect.any(String)
      })
    })

    it('should return 400 if password is not provided', async () => {
      const response = await testHelper.axiosAPIClient
        .post(route, new URLSearchParams({
          client_id: clientId
        }))
      expect(response.status).toBe(400)
      expect(response.data).toEqual({
        error: expect.any(String)
      })
    })

    it('should return 200 on success', async () => {
      const response = await testHelper.axiosAPIClient
        .post(route, new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret
        }))
      expect(response.status).toBe(200)
      expect(response.data).toEqual({
        token_type: expect.any(String),
        access_token: expect.any(String),
        expires_in: expect.any(Number)
      })
    })
  })

  describe('/legacy/oauth2/token', () => {
    const route = '/legacy/oauth2/token'

    it('should return 400 if clientId is not provided', async () => {
      const response = await testHelper.axiosAPIClient
        .post(route, new URLSearchParams({
          client_secret: clientSecret
        }))
      expect(response.status).toBe(400)
      expect(response.data).toEqual({
        error: expect.any(String)
      })
    })

    it('should return 400 if password is not provided', async () => {
      const response = await testHelper.axiosAPIClient
        .post(route, new URLSearchParams({
          client_id: clientId
        }))
      expect(response.status).toBe(400)
      expect(response.data).toEqual({
        error: expect.any(String)
      })
    })

    it('should return 200 on success', async () => {
      const response = await testHelper.axiosAPIClient
        .post(route, new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret
        }))
      expect(response.status).toBe(200)
      expect(response.data).toEqual({
        token_type: expect.any(String),
        access_token: expect.any(String),
        expires_in: expect.any(Number)
      })
    })
  })
})
