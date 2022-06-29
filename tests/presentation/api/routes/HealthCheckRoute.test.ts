import { TestHelper } from '../../../TestHelper'

describe('HealthCheckRoute', () => {
  const testHelper = new TestHelper()
  const route = '/v2/auth/health'

  beforeAll(async () => {
    await testHelper.startupServer()
  })

  afterAll(async () => {
    await testHelper.shutdownServer()
  })

  it('should return 200 on success', async () => {
    const response = await testHelper.axiosAPIClient
      .get(route)
    expect(response.status).toBe(200)
    expect(response.data).toEqual({
      status: 'ok'
    })
  })
})
