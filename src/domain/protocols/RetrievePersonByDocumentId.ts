import { DocumentId } from '../valueObjects'
import { PersonDBPayload } from './PersonDBPayload'

export interface RetrievePersonByDocumentId {
  retrievePersonByDocumentId: (documentId: DocumentId) => Promise<PersonDBPayload>
}
