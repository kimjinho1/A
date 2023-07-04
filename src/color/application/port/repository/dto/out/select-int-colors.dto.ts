import { Prisma } from '@prisma/client'

export type SelectIntColorsDto = Prisma.CarTrimIntColorGetPayload<{
  select: {
    intColor: true
  }
}>[]
