export class PartnerId {
  constructor (readonly value: string) {
    if (!value) throw new Error('Invalid Partner id')
  }
}
