/* eslint-disable no-useless-escape */
export class Name {
  constructor (readonly value: string) {
    if (!value || !this.isValid(value)) throw new Error('Invalid Name')
  }

  isValid (value: string): boolean {
    const regExp = /^[a-z ,.'-]+$/g
    const pattern = new RegExp(regExp)
    return pattern.test(value)
  }
}
