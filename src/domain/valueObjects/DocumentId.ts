import { DocumentValidator } from '../protocols'
export class DocumentId {
  constructor (documentValidators: DocumentValidator[], readonly value: string) {
    if (!this.isValid(documentValidators, value)) throw new Error('Invalid Document Id')
  }

  isValid (validators: DocumentValidator[], value: string): boolean {
    let returnValidator = false
    validators.forEach(element => {
      if (element.isTypeOf(value)) {
        if (!value || !element.isValid(value)) throw new Error('Invalid Document Id')
      }
      returnValidator = true
    })
    if (!returnValidator) {
      throw new Error('Invalid Document Id')
    }
    return returnValidator
  }
}
