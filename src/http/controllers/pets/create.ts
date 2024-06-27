import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    about: z.string().optional(),
    type: z.enum(['dog', 'cat']),
    breed: z.string(),
    age: z.number(),
    energy_level: z.number().max(5),
    independency_level: z.number().max(5),
    environment: z.string(),
    size: z.enum(['small', 'medium', 'large', 'giant']),
    adoption_requirements: z.array(z.string()).optional(),
    images_url: z.array(z.string()),
  })

  const body = bodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const newPet = {
    org_id: Number(request.user.sub),
    ...body,
  }

  await createPetUseCase.execute(newPet)

  return reply.status(201).send()
}
