import { Pet, PetSize, Prisma } from '@prisma/client'

export interface FindAllParams {
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

export interface PetsRepository {
  findById(id: number): Promise<Pet | null>
  findAll(params: FindAllParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
