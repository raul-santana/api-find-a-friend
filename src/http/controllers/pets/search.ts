import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  // TODO: ALLOW SEARCH  FOR TYPE AND BREED TOO
  const querySchema = z.object({
    state: z.string().min(1, { message: 'State is required.' }),
    city: z.string().min(1, { message: 'City is required.' }),
    age: z.coerce.number().optional(),
    size: z
      .enum(['small', 'medium', 'large', 'giant'], {
        message: 'Size must be one of: small, medium, large, giant.',
      })
      .optional(),
    type: z
      .string({
        message: 'Type must be string.',
      })
      .optional(),
    breed: z
      .string({
        message: 'Breed must be string.',
      })
      .optional(),
    energy_level: z.coerce
      .number()
      .max(5, { message: 'Energy level must be at most 5.' })
      .optional(),
    independency_level: z.coerce
      .number()
      .max(5, { message: 'Independency level must be at most 5.' })
      .optional(),
    environment: z.string().optional(),
    adopted: z.coerce.boolean().optional(),
  })

  const {
    state,
    city,
    age,
    size,
    type,
    breed,
    energy_level,
    independency_level,
    environment,
    adopted,
  } = querySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  try {
    const { pets } = await searchPetsUseCase.execute({
      state,
      city,
      age,
      size,
      type,
      breed,
      energy_level,
      independency_level,
      environment,
      adopted,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
