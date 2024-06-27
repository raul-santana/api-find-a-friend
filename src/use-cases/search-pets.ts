import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetSize } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  state: string
  city: string
  age?: number
  size?: PetSize
  type?: string
  breed?: string
  energy_level?: number
  independency_level?: number
  environment?: string
  adopted?: boolean
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
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
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const filters = {
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
    }

    const pets = await this.petsRepository.findAll(filters)

    return {
      pets,
    }
  }
}
