
import { DomainException } from '@/domain/exceptions'
import { IPartnerService } from '@/domain/protocols'
import { PartnerId } from '@/domain/valueObjects'
import { HttpClient } from '../protocols'

export type PartnerSettings = {
  url: string
}

export class PartnerService implements IPartnerService {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly settings: PartnerSettings
  ) {

  }

  async getWebHookByPartnerId (partnerId: PartnerId): Promise<string> {
    try {
      const request = await this.httpClient.request({
        url: `${this.settings.url}partner/${partnerId.value}`,
        method: 'get'
      })

      return request.body.body.automation.url
    } catch (error) {
      console.error(error)
      throw new DomainException('Unable to send notification')
    }
  }
}
