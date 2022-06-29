
import { Person } from '@/domain/entities'
import { PersonDBPayload } from '@/domain/protocols'
import { DocumentId } from '@/domain/valueObjects'
// import { Id } from '@/domain/valueObjects'
import mongoose, { Schema } from 'mongoose'

export type DatabaseSettings = {
  authentication: {
    url: string
  }
}

export class DatabaseService {
  CollectionRequest: mongoose.Model<any, {}, {}, {}>
  constructor (
    private readonly settings: DatabaseSettings
  ) {
    const schema = new Schema(
      {
        requestId: 'string',
        person: 'object',
        result: 'object'
      }
      , { strict: false })
    this.CollectionRequest = mongoose.models.request || mongoose.model('request', schema)
  }

  async connection (): Promise<typeof mongoose | null> {
    if (mongoose.connection.readyState === 1) {
      return null
    }
    return await mongoose.connect(this.settings.authentication.url)
  }

  async retrievePersonByDocumentId (documentId: DocumentId): Promise<PersonDBPayload> {
    await this.connection()

    const personDB = await this.CollectionRequest.findOne({ 'person.documentId': documentId.value })

    return personDB
  }

  async savePerson (requestId: string, person: Person): Promise<void> {
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

  async saveResult (documentId: DocumentId, result: object): Promise<void> {
    await this.connection()
    try {
      const personDB = await this.CollectionRequest.findOne({ 'person.documentId': documentId.value })

      personDB.result = result
      const retorno = await personDB.save()
      console.log(retorno)
    } catch (error) {
      console.log(error)
    }
  }
}
