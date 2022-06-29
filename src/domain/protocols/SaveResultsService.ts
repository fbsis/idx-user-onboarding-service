import { DocumentId } from '../valueObjects'

export interface SaveResultsService {
  saveResult: (documentId: DocumentId, result: object) => Promise<any>
}
