import { Prisma } from '@prisma/client'

export type ModelInfoDto = Prisma.CarModelGetPayload<{
  select: {
    modelId: true
    modelCode: true
    modelName: true
    modelPrice: true
    car: {
      select: {
        carCode: true
        carName: true
      }
    }
    trim: {
      select: {
        trimCode: true
        trimName: true
      }
    }
  }
}>
