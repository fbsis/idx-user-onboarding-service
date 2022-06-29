export const validateOtpTokenPath = {
  post: {
    tags: ['Validate OTP Token'],
    summary: 'Validate OTP Token',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/validateOtpTokenInput'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/validateOtpTokenOutput'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
