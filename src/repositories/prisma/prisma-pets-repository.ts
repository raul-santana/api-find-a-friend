import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: number): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        type: params.type,
        breed: params.breed,
        energy_level: params.energy_level,
        independency_level: params.independency_level,
        environment: params.environment,
        adopted_at: params.adopted
          ? {
              not: null,
            }
          : { equals: null },
        org: {
          state: params.state,
          city: params.city,
        },
      },
    })

    return pets
  }
}
