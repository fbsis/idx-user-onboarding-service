export const aliasLoginPasswordPath = {
  post: {
    tags: ['Login Password Credentials (Alias)'],
    summary: 'User authentication (Substitute alias to PasswordCredentials)',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginPasswordInput'
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
