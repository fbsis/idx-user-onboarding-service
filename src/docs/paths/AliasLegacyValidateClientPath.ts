export const aliasLegacyValidateClientPath = {
  post: {
    tags: ['Validação de Credenciais, Scope & App do ClientCredentials (Legado)'],
    summary: 'Validação de Credenciais, Scope & App do ClientCredentials (Legado)',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/validateClientInput'
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
              $ref: '#/schemas/validateClientOutput'
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
