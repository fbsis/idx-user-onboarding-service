import { Person } from '../entities'

export type PersonDBPayload = {
  requestId: string
  person: Person
  isValid: boolean
  result?: {
    resultado: string
  }
}
