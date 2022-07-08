import { Person } from '../entities'

export interface PersonCommandsRepository {
  registerPerson: (person: Person) => Promise<void>
}
