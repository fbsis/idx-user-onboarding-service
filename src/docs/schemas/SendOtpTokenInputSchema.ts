export const sendOtpTokenInputSchema = {
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
    userId: {
      type: 'string',
      description: 'Required if source is fenix.'
    },
    transactionId: {
      type: 'string',
      description: 'Optional if source is fenix.'
    },
    fenixToken: {
      type: 'string',
      description: 'Required if source is fenix. You need to provide an access token generated from Fênix API (Path: /v1/auth/token).'
    }
  },
  required: ['source', 'method']
}
