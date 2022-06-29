export const validatePasswordTokenPath = {
  post: {
    tags: ['Validate Password Credentials Token  (Alias)'],
    summary: 'Validate Password Credentials Token  (Alias)',
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
              $ref: '#/schemas/tokenOutput'
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
