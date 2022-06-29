export const signInOutputSchema = {
  type: 'object',
  properties: {
    access_token: {
      type: 'string',
      description: 'The access token string issued by the authorization server.'
    },
    token_type: {
      type: 'string',
      description: 'The type of the access token.'
    },
    expires_in: {
      type: 'integer',
      description: 'The duration of time the access token is granted for.'
    }
  }
}
