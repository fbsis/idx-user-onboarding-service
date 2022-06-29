import { TestHelper } from '@/tests/TestHelper'

jest.setTimeout(15000)

describe('SignInRoute', () => {
  const testHelper = new TestHelper()
  const route = '/v2/auth/'
  const username = TestHelper.userCredentials.username
  const password = TestHelper.userCredentials.password

  beforeAll(async () => {
    await testHelper.startupServer()
  })

  afterAll(async () => {
    await testHelper.shutdownServer()
  })

  it('should return 400 if username is not provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, {
        password
      })
    expect(response.status).toBe(400)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 400 if password is not provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, {
        username
      })
    expect(response.status).toBe(400)
    expect(response.data).toEqual({
      error: expect.any(String)
    })
  })

  it('should return 401 if invalid credentials are provided', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, {
        username: 'invalidUsername',
        password: 'inv4lidP4ssw0rd'
      })
    expect(response.status).toBe(200)
    expect(response.data).toEqual({
      status: false,
      json: null
    })
  })

  it('should return 200 on success', async () => {
    const response = await testHelper.axiosAPIClient
      .post(route, {
        username,
        password
      })
    expect(response.status).toBe(200)
    expect(response.data).toEqual({
      status: true,
      json: expect.any(String)
    })
  })
})
