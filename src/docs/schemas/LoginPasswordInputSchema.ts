export const loginPasswordInputSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    secret: {
      type: 'string'
    }
  },
  required: ['username', 'secret']
}
