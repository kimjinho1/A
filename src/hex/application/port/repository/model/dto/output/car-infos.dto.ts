import { Prisma } from '@prisma/client'

export type CarInfosDto = Prisma.CarTypeGetPayload<{
  include: {
    car: true
  }
}>[]
