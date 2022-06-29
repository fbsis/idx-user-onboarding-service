import { HttpRequest, HttpResponse, HttpClient } from '@/infra/protocols'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClientAdapter implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        validateStatus: () => true
      })
    } catch (error) {
      console.error(error)
      throw new Error(String(error))
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
