import { Controller } from '@/presentation/api/protocols'
import { HttpResponse } from '@/presentation/api/helpers'
import { Name, BornDate, DocumentId, CpfDocument } from '@/domain/valueObjects'
import { ValidationPersonInteractor } from '@/domain/usecases'
import { IdWallService, PersonCommandsService, PersonQueryService } from '@/infra/services'
import { EnvAdapter } from '@/infra/configs/envs'
import { Person } from '@/domain/entities'
import { AxiosHttpClientAdapter } from '@/infra/adapters'
import { DomainAlreadyExistsException } from '@/domain/exceptions'

export class ValidationRegisterController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    let name: Name
    let bornDate: BornDate
    let documentId: DocumentId

    let person: Person
    try {
      name = new Name(request.name)
      bornDate = new BornDate(request.born_date)
      documentId = new DocumentId([
        new CpfDocument()
      ], request.document_id)

      person = new Person(name, bornDate, documentId)
    } catch (error) {
      return HttpResponse.badRequest(error)
    }

    try {
      const validateService = new IdWallService(
        new AxiosHttpClientAdapter(),
        EnvAdapter.validateCredencials
      )

      const retrievePersonService = new PersonQueryService(EnvAdapter.databaseCredencials)

      const persistPersonService = new PersonCommandsService(EnvAdapter.databaseCredencials)

      const validate = new ValidationPersonInteractor(
        validateService,
        retrievePersonService,
        persistPersonService)

      const result = await validate.execute(person)

      return HttpResponse.ok(result)
    } catch (error) {
      console.error(error)
      if (error instanceof DomainAlreadyExistsException) return HttpResponse.conflict('Already exists the validation for this person')

      return HttpResponse.serverError(error)
    }
  }
}
