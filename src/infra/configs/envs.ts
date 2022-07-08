import { DatabaseSettings } from '../services/DatabaseService'
import { PartnerSettings } from '../services/PartnerService'

export class EnvAdapter {
  static readonly server = {
    stage: process.env.NODE_ENV ?? 'development',
    name: process.env.SERVICE_NAME ?? 'idx-user-onboarding-service'
  }

  static readonly http = {
    listenPort: Number(process.env.PORT ?? 3003)
  }

  static readonly databaseCredencials: DatabaseSettings = {
    authentication: {
      url: process.env.MONGO_CREDENCIAL ?? 'mongodb://localhost/xchange-user-onboarding'
    }
  }

  static readonly partnerConfig: PartnerSettings = {
    url: process.env.MONGO_CREDENCIAL ?? 'http://localhost:3001/v1/'

  }

  static readonly tokenSecret: string = process.env.JWT_SECRET ?? 'secret'
}
