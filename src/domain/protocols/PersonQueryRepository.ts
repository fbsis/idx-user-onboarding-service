import { Person } from '../entities'
import { DocumentId } from '../valueObjects'

export interface PersonQueryRepository {
  getByDocumentId: (person: DocumentId) => Promise<Person | null>
}
