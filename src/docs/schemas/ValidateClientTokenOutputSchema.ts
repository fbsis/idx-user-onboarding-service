export const validateClientTokenOutputSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'boolean'
    },
    token: {
      type: 'string'
    },
    clientId: {
      type: 'string'
    },
    audience: {
      type: 'string'
    },
    expires: {
      type: 'integer'
    }
  }
}
