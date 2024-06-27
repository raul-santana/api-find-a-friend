import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'adoptions@petrescue.org',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      email: 'adoptions@petrescue.org',
      password_hash: await hash('123456', 6),
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
        email: 'adoptions@petrescue.org',
        password: 'senha-errada',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      email: 'adoptions@petrescue.org',
      password_hash: await hash('123456', 6),
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

    const { org } = await sut.execute({
      email: 'adoptions@petrescue.org',
      password: '123456',
    })

    expect(org.email).toEqual('adoptions@petrescue.org')
  })
})
