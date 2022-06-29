export class DomainAlreadyExistsException extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'DomainAlreadyExistsException'
  }
}
