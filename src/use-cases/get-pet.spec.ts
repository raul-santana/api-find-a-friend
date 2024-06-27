import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetUseCase } from './get-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)

    await orgsRepository.create({
      email: 'adoptions@petrescue.org',
      password_hash:
        '$2b$06$EB.7cqL0Jl/W0PUFjqEv..T3IRVCqkJwKkFs08RSWDNyxgSOoG3jW',
      name: 'Pet Rescue Foundation',
      author_name: 'John Doe',
      whatsapp_number: '219978654432',
      cep: '21390876',
      state: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
      street: 'rua Silvio Santos',
      latitude: 34.09,
      longitude: -118.3617,
    })

    await petsRepository.create({
      org_id: 1,
      name: 'Draven',
      about: 'An energetic and playful dog in need of a loving family',
      type: 'dog',
      breed: 'golden retriever',
      age: 2,
      energy_level: 8,
      independency_level: 3,
      environment: 'Spacious yard',
      size: 'large',
      adoption_requirements: ['Experienced dog owner', 'Secure, fenced yard'],
      images_url: ['https://example.com/dog-image1.jpg'],
    })
  })

  it('should be able to get pet by id', async () => {
    const { pet } = await sut.execute({ id: 1 })

    expect(pet.name).toEqual('Draven')
  })

  it('should not be able to get pet by id', async () => {
    await expect(sut.execute({ id: 1000 })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
