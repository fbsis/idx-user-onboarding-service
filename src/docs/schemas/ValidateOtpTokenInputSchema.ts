export const validateOtpTokenInputSchema = {
  type: 'object',
  properties: {
    source: {
      type: 'string',
      description: 'Options: fenix and auth0.'
    },
    method: {
      type: 'string',
      description: 'Options: sms and email.'
    },
    token: {
      type: 'string',
      description: 'Received token.'
    },
    email: {
      type: 'string',
      description: 'It is required if you send the token using method email.'
    },
    phoneNumber: {
      type: 'string',
      description: 'It is required if you send the token using method sms.'
    },
    tokenId: {
      type: 'string',
      description: 'It is required if you send the token using source fenix.'
    },
    fenixToken: {
      type: 'string',
      description: 'It is required if you send the token using source fenix. You need to provide an access token generated from Fênix API (Path: /v1/auth/token).'
    }
  },
  required: ['source', 'method', 'token']
}
