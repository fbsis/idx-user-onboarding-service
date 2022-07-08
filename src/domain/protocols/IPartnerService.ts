import { PartnerId } from '../valueObjects'

export interface IPartnerService {
  getWebHookByPartnerId: (partnerId: PartnerId) => Promise<string>
}
