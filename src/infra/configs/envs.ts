import { DatabaseSettings } from '../services/DatabaseService'
import { ValidateSettings } from '../services/IdWallService'

export class EnvAdapter {
  static readonly server = {
    stage: process.env.NODE_ENV ?? 'development',
    name: process.env.SERVICE_NAME ?? 'authorization'
  }

  static readonly http = {
    listenPort: Number(process.env.PORT ?? 3002)
  }

  static readonly databaseCredencials: DatabaseSettings = {
    authentication: {
      url: process.env.MONGO_CREDENCIAL ?? 'mongodb://localhost/xchange-document-validation'
    }
  }

  static readonly validateCredencials: ValidateSettings = {
    authentication: {
      token: process.env.MONGO_CREDENCIAL ?? 'foobar',
      url: process.env.MONGO_CREDENCIAL ?? 'http://localhost:3002/fake-validate'
    }
  }

  static readonly tokenSecret: string = process.env.JWT_SECRET ?? 'secret'
}
