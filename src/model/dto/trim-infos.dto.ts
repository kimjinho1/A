import { Prisma } from '@prisma/client'

export type TrimInfosDto = Prisma.CarModelGetPayload<{
  select: {
    trim: {
      select: {
        trimCode: true
        trimName: true
      }
    }
    modelId: true
    modelCode: true
    modelImagePath: true
    modelPrice: true
  }
}>
