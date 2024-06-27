import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)

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
      images_url: ['https://example.com/dog-image1.jpg'],
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

    await petsRepository.create({
      org_id: 1,
      name: 'Katarina',
      about: 'An energetic and playful cat in need of a loving family',
      type: 'cat',
      breed: 'siamese',
      age: 8,
      energy_level: 2,
      independency_level: 3,
      environment: 'Spacious yard',
      size: 'medium',
      adoption_requirements: ['Experienced dog owner', 'Secure, fenced yard'],
      images_url: ['https://example.com/dog-image1.jpg'],
    })
  })

  it('should be able to search pets by city', async () => {
    const { pets } = await sut.execute({
      state: 'São Paulo',
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(3)
  })

  it('should be able to search pets by city and age', async () => {
    const { pets } = await sut.execute({
      state: 'São Paulo',
      city: 'São Paulo',
      age: 2,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const { pets } = await sut.execute({
      state: 'São Paulo',
      city: 'São Paulo',
      size: 'medium',
    })

    expect(pets).toHaveLength(2)
  })

  it('should be able to search pets by city and type', async () => {
    const { pets } = await sut.execute({
      state: 'São Paulo',
      city: 'São Paulo',
      type: 'dog',
    })

    expect(pets).toHaveLength(2)
    expect(pets[0].type).toEqual('dog')
    expect(pets[1].type).toEqual('dog')
  })

  it('should be able to search pets by city and breed', async () => {
    const { pets } = await sut.execute({
      state: 'São Paulo',
      city: 'São Paulo',
      breed: 'siamese',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].breed).toEqual('siamese')
  })

  it('should be able to search pets by city and energy level', async () => {
    const { pets } = await sut.execute({
      state: 'São Paulo',
      city: 'São Paulo',
      energy_level: 8,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const { pets } = await sut.execute({
      state: 'São Paulo',
      city: 'São Paulo',
      environment: 'Spacious yard',
    })

    expect(pets).toHaveLength(2)
  })
})
