export const validatePasswordTokenOutputSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'boolean'
    },
    token: {
      type: 'string'
    },
    userName: {
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
