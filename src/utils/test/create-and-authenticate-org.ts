import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { faker } from '@faker-js/faker'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const password_hash = await hash('senha-muito-forte@@', 6)

  const org = await prisma.org.create({
    data: {
      email: faker.internet.email(),
      password_hash,
      name: faker.company.name(),
      author_name: faker.person.fullName(),
      whatsapp_number: faker.phone.number(), // Ajuste conforme necessário para formato local
      cep: faker.location.zipCode(), // Ajuste conforme necessário para formato local
      state: faker.location.state(),
      city: faker.location.city(),
      neighborhood: faker.location.street(),
      street: faker.address.streetAddress(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
  })

  const authResponse = await request(app.server).post('/orgs/login').send({
    email: org.email,
    password: 'senha-muito-forte@@',
  })

  const { token } = authResponse.body

  return {
    token,
    org,
  }
}
