export const aliasLoginClientPath = {
  post: {
    tags: ['Login Client Credentials (Alias)'],
    summary: 'Login Client Credentials (Alias)',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginClientInput'
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
              $ref: '#/schemas/loginClientOutput'
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
