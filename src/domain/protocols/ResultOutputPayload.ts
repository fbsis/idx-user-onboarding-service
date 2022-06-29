import { Person } from '../entities'

export type ResultOutputPayload = {
  isValid: boolean
  person: Person
  result?: {
    resultado: string
  }
}
