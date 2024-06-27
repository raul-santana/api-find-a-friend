import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, PetSize } from '@prisma/client'
import { OrgNotExistsError } from './errors/org-not-exists'

interface CreatePetgUseCaseRequest {
  org_id: number
  name: string
  about?: string
  type: string
  breed: string
  age: number
  energy_level: number
  independency_level: number
  environment: string
  size: PetSize
  adoption_requirements?: string[]
  images_url: string[]
}

interface CreatePetgUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    org_id,
    name,
    about,
    type,
    breed,
    age,
    energy_level,
    independency_level,
    environment,
    size,
    adoption_requirements,
    images_url,
  }: CreatePetgUseCaseRequest): Promise<CreatePetgUseCaseResponse> {
    const isOrgCreate = await this.orgsRepository.findById(org_id)

    if (!isOrgCreate) {
      throw new OrgNotExistsError()
    }

    const pet = await this.petsRepository.create({
      org_id,
      name,
      about,
      type,
      breed,
      age,
      energy_level,
      independency_level,
      environment,
      size,
      adoption_requirements,
      images_url,
    })

    return {
      pet,
    }
  }
}
