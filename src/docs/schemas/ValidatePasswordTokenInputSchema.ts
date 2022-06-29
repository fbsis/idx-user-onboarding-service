export const validatePasswordTokenInputSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string'
    },
    resource: {
      type: 'string'
    }
  }
}
