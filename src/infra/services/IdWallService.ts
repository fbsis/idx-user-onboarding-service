
import { Person } from '@/domain/entities'
import { DomainException } from '@/domain/exceptions'
import { ValidationService } from '@/domain/protocols'
import { HttpClient } from '../protocols'

export type ValidateSettings = {
  authentication: {
    token: string
    url: string
  }
}
export type ResultIdWall = {
  result: {
    resultado: string
  }
}

export class IdWallService implements ValidationService {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly settings: ValidateSettings
  ) {

  }

  async validate (person: Person): Promise<string> {
    try {
      const requestToValidate = await this.httpClient.request({
        url: `${this.settings.authentication.url}/relatorios`,
        method: 'post',
        headers: {
          authorization: `Bearer ${this.settings.authentication.token}`
        },
        body: {
          matriz: `validate${person.documentId.value}`,
          parametros: {
            cpf_data_de_nascimento: person.bornDate.value,
            cpf_nome: person.name.value,
            cpf_numero: person.documentId.value
          }
        }
      })

      return requestToValidate.body.result.numero
    } catch (error) {
      console.error(error)
      throw new DomainException('Unable to validate service')
    }
  }

  async verify (requestId: string): Promise<string> {
    try {
      const requestToValidate = await this.httpClient.request({
        url: `${this.settings.authentication.url}/relatorios/${requestId}`,
        method: 'get',
        headers: {
          authorization: `Bearer ${this.settings.authentication.token}`
        }
      })

      return requestToValidate.body?.result
    } catch (error) {
      console.error(error)
      throw new DomainException('Unable to validate service')
    }
  }
}
