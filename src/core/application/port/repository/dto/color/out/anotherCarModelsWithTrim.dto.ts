import { Prisma } from '@prisma/client'

export type AnotherCarModelsWithTrimDto = Prisma.CarModelGetPayload<{
  select: {
    modelCode: true
    modelPrice: true
    modelImagePath: true
    trim: true
  }
}>[]
