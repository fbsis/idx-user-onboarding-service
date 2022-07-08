
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
        partnerId: 'string',
        name: 'string',
        bornDate: 'string',
        documentId: 'string',
        isBlacklisted: 'boolean'
      }
      , { strict: false })
    this.CollectionRequest = mongoose.models.person || mongoose.model('person', schema)
  }

  async connection (): Promise<typeof mongoose | null> {
    if (mongoose.connection.readyState === 1) {
      return null
    }
    return await mongoose.connect(this.settings.authentication.url)
  }
}
