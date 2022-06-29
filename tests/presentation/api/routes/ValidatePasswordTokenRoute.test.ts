import { TestHelper } from '@/tests/TestHelper'

jest.setTimeout(15000)

describe('ValidatePasswordTokenRoute', () => {
  const testHelper = new TestHelper()
  const route = '/authorizationserver/digital/validate'

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
    const signInResponse = await testHelper.makeRequestToSignInRoute()
    const { access_token: accessToken } = JSON.parse(signInResponse.data.json)
    const response = await testHelper.axiosAPIClient
      .post(route, {
        token: accessToken
      })
    expect(response.status).toBe(200)
    expect(response.data).toEqual(expect.objectContaining({
      status: expect.any(Boolean),
      json: expect.any(String)
    }))
  })
})
