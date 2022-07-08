import { Controller } from '@/presentation/api/protocols'
import { HttpResponse } from '@/presentation/api/helpers'
import { Name, BornDate, DocumentId, CpfDocument, PartnerId } from '@/domain/valueObjects'
import { RegisterPersonInteractor } from '@/domain/usecases'
import { PersonCommandService, PersonQueryService, WebHookNotification } from '@/infra/services'
import { EnvAdapter } from '@/infra/configs/envs'
import { Person } from '@/domain/entities'
import { AxiosHttpClientAdapter } from '@/infra/adapters'
import { DomainAlreadyExistsException } from '@/domain/exceptions'
import { PartnerService } from '@/infra/services/PartnerService'

export class RegisterController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    let partnerId: PartnerId
    let name: Name
    let bornDate: BornDate
    let documentId: DocumentId

    let person: Person
    try {
      partnerId = new PartnerId(request.partner_id)
      name = new Name(request.name)
      bornDate = new BornDate(request.born_date)

      // ToDo : refatorar com documento VO
      documentId = new DocumentId([
        new CpfDocument()
      ], request.document_id)

      person = new Person(partnerId, name, bornDate, documentId)
    } catch (error) {
      return HttpResponse.badRequest(error)
    }

    try {
      const retrievePersonService = new PersonQueryService(EnvAdapter.databaseCredencials)

      const persistPersonService = new PersonCommandService(EnvAdapter.databaseCredencials)

      const partnerService = new PartnerService(new AxiosHttpClientAdapter(), EnvAdapter.partnerConfig)

      const notifyService = new WebHookNotification(new AxiosHttpClientAdapter())

      const validate = new RegisterPersonInteractor(
        retrievePersonService,
        persistPersonService,
        notifyService,
        partnerService
      )

      const result = await validate.execute(person)

      return HttpResponse.ok(result)
    } catch (error) {
      console.error(error)
      if (error instanceof DomainAlreadyExistsException) return HttpResponse.conflict('This user already exists')

      return HttpResponse.serverError(error)
    }
  }
}
