export const validateClientInputSchema = {
  type: 'object',
  properties: {
    client_id: {
      type: 'string'
    },
    client_secret: {
      type: 'string'
    },
    scope: {
      type: 'string'
    },
    application: {
      type: 'string'
    }
  },
  required: ['client_id', 'client_secret', 'scope', 'application']
}
