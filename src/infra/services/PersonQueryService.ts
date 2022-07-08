
import { Person } from '@/domain/entities'
import { PersonQueryRepository } from '@/domain/protocols'
import { DocumentId } from '@/domain/valueObjects'
import { DatabaseService } from './DatabaseService'

export class PersonQueryService extends DatabaseService implements PersonQueryRepository {
  async getByDocumentId (documentId: DocumentId): Promise<Person> {
    await this.connection()

    const userDB = await this.CollectionRequest.findOne({ documentId: documentId.value })

    return userDB
  }
}
