import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Organization Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(orgsRepository, petsRepository)

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
  })

  it('should to create pet', async () => {
    const { pet } = await sut.execute({
      org_id: 1,
      name: 'Fido',
      about: 'A friendly dog looking for a home',
      type: 'dog',
      breed: 'labrador',
      age: 3,
      energy_level: 5,
      independency_level: 4,
      environment: 'Large yard',
      size: 'medium',
      adoption_requirements: ['Home visit required', 'Fenced yard'],
      images_url: ['https://example.com/dog-image1.jpg'],
    })

    expect(pet.id).toEqual(1)
  })
})
