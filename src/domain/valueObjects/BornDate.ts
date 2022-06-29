/* eslint-disable no-useless-escape */
export class BornDate {
  constructor (readonly value: string) {
    if (!value || !this.isValid(value)) throw new Error('Invalid born date')
  }

  isValid (value: string): boolean {
    const regExp = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/g
    const pattern = new RegExp(regExp)
    return pattern.test(value)
  }
}
