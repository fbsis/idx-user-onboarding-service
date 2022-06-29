import { Person } from '../entities'

export interface PersonQueryRepository {
  get: (person: Person) => Promise<Person | null>
}
