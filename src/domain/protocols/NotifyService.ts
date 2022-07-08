
export interface NotifyService {
  sendNotification: (url: string, action: string, body: object) => Promise<void>
}
