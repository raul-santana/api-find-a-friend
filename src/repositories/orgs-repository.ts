import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findById(id: number): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
}
