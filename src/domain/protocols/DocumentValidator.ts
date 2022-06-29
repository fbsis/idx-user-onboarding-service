export interface DocumentValidator {
  isTypeOf: (documentId: string) => boolean
  isValid: (documentId: string) => boolean
}
