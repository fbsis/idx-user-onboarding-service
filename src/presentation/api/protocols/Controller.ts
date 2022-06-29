import { HttpResponse } from '@/presentation/api/helpers'

export interface Controller {
  handle: (request: any) => Promise<HttpResponse>
}
