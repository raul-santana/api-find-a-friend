import { FastifyInstance } from 'fastify'
import { create } from './create'
import { authenticate } from './authenticate'

export async function orgsRoutes(app: FastifyInstance) {
  //   app.addHook('onRequest', verifyJwt)

  app.post('/orgs', create)
  app.post('/orgs/login', authenticate)
}
