import { DomainAlreadyExistsException, DomainWaitingException } from '../exceptions'
import { PersonDBPayload, ResultOutputPayload, RetrievePersonByDocumentId, SaveResultsService, VerificationService } from '../protocols'
import { DocumentId } from '../valueObjects'

export class VerificationPersonInteractor {
  constructor (
    private readonly validationService: VerificationService,
    private readonly getPersonService: RetrievePersonByDocumentId,
    private readonly saveResultsService: SaveResultsService
  ) {}

  formatResults (db: PersonDBPayload): ResultOutputPayload {
    return {
      isValid: db.result?.resultado === 'VALID' ?? false,
      person: db.person,
      result: db.result
    }
  }

  async execute (documentId: DocumentId): Promise<ResultOutputPayload> {
    const retrieve = await this.getPersonService.retrievePersonByDocumentId(documentId)
    if (!retrieve) { throw new DomainAlreadyExistsException('This person do not exists on our registers') }

    if (retrieve.result) return this.formatResults(retrieve)

    const validate = await this.validationService.verify(retrieve.requestId)
    if (validate) {
      await this.saveResultsService.saveResult(documentId, validate)
      retrieve.result = validate
    }
    if (validate) {
      return this.formatResults(retrieve)
    }
    throw new DomainWaitingException('Aguardando retorno')
  }
}
