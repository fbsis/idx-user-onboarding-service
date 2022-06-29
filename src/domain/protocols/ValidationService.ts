
import { Person } from '../entities'

export interface ValidationService {
  validate: (person: Person) => Promise<string>
}
