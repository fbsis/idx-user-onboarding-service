export const tokenOutputSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'boolean',
      description: 'The status if token is valid or not.'
    },
    json: {
      type: 'string',
      description: 'The stringified access token payload.'
    }
  }
}
