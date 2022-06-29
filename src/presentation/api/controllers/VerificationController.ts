import { Controller } from '@/presentation/api/protocols'
import { HttpResponse } from '@/presentation/api/helpers'
import { CpfDocument, DocumentId } from '@/domain/valueObjects'
import { DatabaseService, IdWallService } from '@/infra/services'
import { EnvAdapter } from '@/infra/configs/envs'
import { AxiosHttpClientAdapter } from '@/infra/adapters'
import { DomainWaitingException } from '@/domain/exceptions'
import { VerificationPersonInteractor } from '@/domain/usecases/VerificationPersonInteractor'

export class VerificationController implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    let documentId: DocumentId

    try {
      documentId = new DocumentId([new CpfDocument()], request.document_id)
    } catch (error) {
      return HttpResponse.badRequest(error)
    }

    try {
      const validateService = new IdWallService(
        new AxiosHttpClientAdapter(),
        EnvAdapter.validateCredencials
      )
      const persistPersonService = new DatabaseService(EnvAdapter.databaseCredencials)

      const retrievePersonService = new DatabaseService(EnvAdapter.databaseCredencials)

      const validate = new VerificationPersonInteractor(
        validateService,
        retrievePersonService,
        persistPersonService)

      const result = await validate.execute(documentId)

      return HttpResponse.ok(result)
    } catch (error) {
      console.error(error)
      if (error instanceof DomainWaitingException) return HttpResponse.notFound()

      return HttpResponse.serverError(error)
    }
  }
}
