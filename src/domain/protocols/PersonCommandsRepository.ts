import { Person } from '../entities'

export interface PersonCommandsRepository {
  saveByRequestNumber: (requestNumber: string, person: Person) => Promise<void>
}
