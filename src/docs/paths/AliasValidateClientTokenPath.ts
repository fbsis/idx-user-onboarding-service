export const aliasValidateClientTokenPath = {
  post: {
    tags: ['Validate Client Credentials Token (Machine to machine) (Alias)'],
    summary: 'Validate Client Credentials Token (Machine to machine)  (Alias)',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/validateClientTokenInput'
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
