export const sendSmsInputSchema = {
  type: 'object',
  properties: {
    recipient: {
      type: 'string'
    },
    body: {
      type: 'string'
    },
    sender: {
      type: 'string'
    }
  },
  required: ['recipient', 'body']
}
