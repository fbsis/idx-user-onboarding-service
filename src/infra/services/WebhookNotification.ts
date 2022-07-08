
import { DomainException } from '@/domain/exceptions'
import { NotifyService } from '@/domain/protocols'
import { HttpClient } from '../protocols'

export class WebHookNotification implements NotifyService {
  constructor (
    private readonly httpClient: HttpClient
  ) {

  }

  async sendNotification (url: string, action: string, body: object): Promise<void> {
    try {
      await this.httpClient.request({
        url: `${url}`,
        method: 'post',
        body: {
          action,
          ...body
        }
      })
    } catch (error) {
      console.error(error)
      throw new DomainException('Unable to send notification')
    }
  }
}
