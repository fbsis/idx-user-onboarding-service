export class DomainWaitingException extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'DomainWaitingException'
  }
}
