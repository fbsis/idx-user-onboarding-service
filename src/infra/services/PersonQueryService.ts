
import { Person } from '@/domain/entities'
import { PersonQueryRepository } from '@/domain/protocols'
import { DatabaseService } from './DatabaseService'

export class PersonQueryService extends DatabaseService implements PersonQueryRepository {
  async get (person: Person): Promise<Person> {
    await this.connection()

    const personDB = await this.CollectionRequest.findOne({ 'person.documentId': person.documentId.value })

    return personDB
  }
}
