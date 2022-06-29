import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Authorization Service',
    description: 'Esse serviço é utilizado para autenticação de usuários (Password Credentials) e serviços (Client Credentials).',
    version: '1.0.0',
    contact: {
      name: 'Fernando Tomio - Nimbus House',
      email: 'fernando.tomio@nimbus.house'
    }
  },
  tags: [{
    name: 'Authorization'
  }],
  paths,
  schemas,
  components
}
