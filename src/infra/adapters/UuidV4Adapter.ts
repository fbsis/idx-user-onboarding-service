import { UuidGenerator } from '@/infra/protocols'
import { v4 as uuidv4 } from 'uuid'

export class Uuid4Adapter implements UuidGenerator {
  generateUuid (): string {
    return uuidv4()
  }
}
