import { TestHelper } from '@/tests/TestHelper'

jest.setTimeout(15000)

describe('ValidateCoreAuthTokenRoute', () => {
  const testHelper = new TestHelper()
  const route = '/v2/auth/api/validate'

  beforeAll(async () => {
    await testHelper.startupServer()
  })

  afterAll(async () => {
    await testHelper.shutdownServer()
  })

  it('should return 400 if token is not provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route)
    expect(response.status).toBe(400)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 200 on success', async () => {
    const loginClientResponse = await testHelper.makeRequestToLoginClientRoute()
    const response = await testHelper.axiosAPIClient
      .post(route, {
        token: loginClientResponse.data.access_token
      })
    expect(response.status).toBe(200)
    expect(response.data).toEqual(expect.objectContaining({
      status: expect.any(Boolean),
      json: expect.any(String)
    }))
  })
})
