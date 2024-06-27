import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetPetUseCase } from '../get-pet'
import { PetNotFoundError } from './pet-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetUseCase

describe('Get Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a pet', async () => {
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
    })

    const { pet } = await sut.execute({
      id: 1,
    })

    expect(pet.name).toEqual('Fido')
  })

  it('should not be able to get a pet', async () => {
    await orgsRepository.create({
      email: 'adoptions@petrescue.org',
      password_hash:
        '$2b$06$EB.7cqL0Jl/W0PUFjqEv..T3IRVCqkJwKkFs08RSWDNyxgSOoG3jW',
      name: 'Pet Rescue Foundation',
      author_name: 'John Doe',
      whatsapp_number: '219978654432',
      cep: '21390876',
      state: 'Rio de Janeiro',
      city: 'Rio de Janeiro',
      neighborhood: 'Bela Vista',
      street: 'rua Silvio Santos',
      latitude: 34.09,
      longitude: -118.3617,
    })

    await petsRepository.create({
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
    })

    await expect(() =>
      sut.execute({
        id: 22,
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
