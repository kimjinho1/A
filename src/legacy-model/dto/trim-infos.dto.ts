import { Prisma } from '@prisma/client'

export type TrimInfosDto = Prisma.CarModelGetPayload<{
  select: {
    modelId: true
    modelCode: true
    modelImagePath: true
    modelPrice: true
    trim: {
      select: {
        trimCode: true
        trimName: true
      }
    }
  }
}>
