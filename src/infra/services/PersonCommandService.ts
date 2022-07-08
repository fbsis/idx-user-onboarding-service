
import { Person } from '@/domain/entities'
import { PersonCommandsRepository } from '@/domain/protocols'
import { DatabaseService } from './DatabaseService'

export class PersonCommandService extends DatabaseService implements PersonCommandsRepository {
  async registerPerson (person: Person): Promise<void> {
    await this.connection()

    const body = {
      partnerId: person.partnerId.value,
      name: person.name.value,
      bornDate: person.bornDate.value,
      documentId: person.documentId.value,
      isBlacklisted: false
    }
    const requestDataCollection = new this.CollectionRequest(body)
    await requestDataCollection.save()
  }
}
