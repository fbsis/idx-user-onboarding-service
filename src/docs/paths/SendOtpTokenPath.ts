export const sendOtpTokenPath = {
  post: {
    tags: ['Send OTP Token'],
    summary: 'Send OTP Token',
    parameters: [
      {
        name: 'Authorization',
        in: 'header',
        description: 'Authorization Token',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/sendOtpTokenInput'
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
              $ref: '#/schemas/sendOtpTokenOutput'
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
