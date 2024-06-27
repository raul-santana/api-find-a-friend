import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org'
import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should to create org', async () => {
    const { org } = await sut.execute({
      email: 'adoptions@petrescue.org',
      password: '123456',
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

    expect(org.id).toEqual(1)
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      email: 'adoptions@petrescue.org',
      password: '123456',
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

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'adoptions@petrescue.org'

    await sut.execute({
      email,
      password: '123456',
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

    await expect(() =>
      sut.execute({
        email,
        password: '123456',
        name: 'Casa dos Pets',
        author_name: 'John Doe',
        whatsapp_number: '219978654432',
        cep: '21390876',
        state: 'São Paulo',
        city: 'São Paulo',
        neighborhood: 'Bela Vista',
        street: 'rua Silvio Santos',
        latitude: 34.09,
        longitude: -118.3617,
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
