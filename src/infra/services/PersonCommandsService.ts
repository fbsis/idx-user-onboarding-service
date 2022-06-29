
import { Person } from '@/domain/entities'
import { PersonCommandsRepository } from '@/domain/protocols'
import { DatabaseService } from './DatabaseService'

export class PersonCommandsService extends DatabaseService implements PersonCommandsRepository { // colocar no singular (command)
  async saveByRequestNumber (requestId: string, person: Person): Promise<void> {
    await this.connection()

    const body = {
      requestId,
      person: {
        name: person.name.value,
        bornDate: person.bornDate.value,
        documentId: person.documentId.value
      }
    }
    const requestDataCollection = new this.CollectionRequest(body)
    await requestDataCollection.save()
  }
}
