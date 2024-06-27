import { Pet, PetSize, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const incrementedId =
      this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1

    const pet = {
      id: incrementedId,
      org_id: Number(data.org_id),
      name: data.name,
      about: data.about ? data.about : '',
      type: data.type,
      breed: data.breed,
      age: data.age,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      environment: data.environment ? data.environment : '',
      size: data.size ?? ('small' as PetSize),
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      adoption_requirements: data.adoption_requirements as string[],
      images_url: data.images_url as string[],
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: number): Promise<Pet | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    // Filtra as organizações pelo estado e cidade fornecidos nos parâmetros
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.state === params.state && org.city === params.city,
    )

    const pets = this.items
      // Filtra os pets que pertencem a uma das organizações filtradas acima
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      // Filtra os pets com base na adoção, se fornecido nos parâmetros
      .filter((item) => {
        if (params.adopted === true) {
          return item.adopted_at !== null
        } else if (params.adopted === false) {
          return item.adopted_at === null
        }
        return true // Se o parâmetro não foi fornecido, não aplicar o filtro
      })
      // Filtra os pets com base na idade, se fornecida nos parâmetros
      .filter((item) => (params.age ? item.age === params.age : true))
      // Filtra os pets com base no tamanho, se fornecido nos parâmetros
      .filter((item) => (params.size ? item.size === params.size : true))
      // Filtra os pets com base no tipo('dog' ou 'cat'), se fornecido nos parâmetros
      .filter((item) => (params.type ? item.type === params.type : true))
      // Filtra os pets com base na raça, se fornecido nos parâmetros
      .filter((item) => (params.breed ? item.breed === params.breed : true))
      // Filtra os pets com base no nível de energia, se fornecido nos parâmetros
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.independency_level
          ? item.independency_level === params.independency_level
          : true,
      )
      // Filtra os pets com base no ambiente, se fornecido nos parâmetros
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }
}
