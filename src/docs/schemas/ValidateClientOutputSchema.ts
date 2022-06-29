export const validateClientOutputSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'boolean'
    },
    json: {
      type: 'object',
      properties: {
        status: {
          type: 'boolean'
        }
      }
    }
  }
}
