export const validateTokenPath = {
  post: {
    tags: ['Validate Access Token'],
    summary: 'Access token validation',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/validatePasswordTokenInput'
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
              $ref: '#/schemas/validatePasswordTokenOutput'
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
