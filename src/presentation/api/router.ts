import { Controller, Middleware } from '@/presentation/api/protocols'
import {
  ValidationRegisterController
} from '@/presentation/api/controllers'
import { RequestHandler, Router } from 'express'

export class ExpressRouter {
  readonly router: Router

  constructor (
    healthCheck: RequestHandler
  ) {
    this.router = Router()
    this.router.get('/v1/partner/health', healthCheck)

    this.router.post('/v1/onboard', this.adaptController(new ValidationRegisterController()))
  }

  private readonly adaptController = (controller: Controller): RequestHandler => {
    return async (request, response) => {
      const httpRequest = {
        ...request.body,
        ...request.params,
        ...request.query,
        accessToken: request.headers.authorization,
        ipAddress: request.headers['x-real-ip'] ?? request.connection.remoteAddress,
        userAgent: request.headers['user-agent']
      }
      const httpResponse = await controller.handle(httpRequest)
      response.status(httpResponse.statusCode).json(httpResponse.data instanceof Error
        ? {
            status: httpResponse.statusCode,
            error: httpResponse.data.message
          }
        : {
            status: httpResponse.statusCode,
            body: httpResponse.data
          })
    }
  }

  private readonly adaptMiddleware = (middleware: Middleware): RequestHandler => {
    return async (request, response, next) => {
      const httpRequest = {
        apiToken: request.headers.authorization
      }
      const httpResponse = await middleware.handle(httpRequest)
      if (httpResponse.statusCode === 200) {
        next()
      } else {
        response.status(httpResponse.statusCode).json({
          error: httpResponse.data.message
        })
      }
    }
  }
}
