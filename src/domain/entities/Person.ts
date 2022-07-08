import { BornDate, DocumentId, Name, PartnerId } from '@/domain/valueObjects'

export class Person {
  constructor (
    readonly partnerId: PartnerId,
    readonly name: Name,
    readonly bornDate: BornDate,
    readonly documentId: DocumentId
  ) {}

  toJson (): object {
    return {
      partnerId: this.partnerId.value,
      name: this.name.value,
      bornDate: this.bornDate.value,
      documentId: this.documentId.value
    }
  }
}
