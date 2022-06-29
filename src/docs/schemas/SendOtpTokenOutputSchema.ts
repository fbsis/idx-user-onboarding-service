export const sendOtpTokenOutputSchema = {
  type: 'object',
  properties: {
    contact: {
      type: 'string',
      description: 'Save this information. It will be required to validate the received token.'
    },
    otpTokenId: {
      type: 'string',
      nullable: true,
      description: 'If your source is fenix then you need to save this information to validate the received token.'
    }
  }
}
