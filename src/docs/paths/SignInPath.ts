export const signInPath = {
  post: {
    tags: ['SignIn'],
    summary: 'User authentication',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signInInput'
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
