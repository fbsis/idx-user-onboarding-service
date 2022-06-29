export const validateClientTokenInputSchema = {
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
