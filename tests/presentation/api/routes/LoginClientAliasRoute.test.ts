import { TestHelper } from '@/tests/TestHelper'

jest.setTimeout(15000)

describe('LoginClientAliasRoute', () => {
  const testHelper = new TestHelper()
  const clientId = TestHelper.clientCredentials.clientId
  const clientSecret = TestHelper.clientCredentials.clientSecret

  beforeAll(async () => {
    await testHelper.startupServer()
  })

  afterAll(async () => {
    await testHelper.shutdownServer()
  })

  describe('/authorizationserver/clientcredentials/token', () => {
    const route = '/authorizationserver/clientcredentials/token'

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
        status: true,
        json: expect.any(String)
      })
    })
  })
})
