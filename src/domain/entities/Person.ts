import { BornDate, DocumentId, Name } from '@/domain/valueObjects'

export class Person {
  constructor (
    readonly name: Name,
    readonly bornDate: BornDate,
    readonly documentId: DocumentId
  ) {}
}
