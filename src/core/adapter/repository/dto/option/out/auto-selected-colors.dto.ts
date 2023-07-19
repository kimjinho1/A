import { Prisma } from '@prisma/client'

export type AutoSelectedColorsDto = Prisma.IntColorOptionGetPayload<{
  select: {
    intColor: {
      select: {
        intColorId: true
        intColorCode: true
        intColorName: true
      }
    }
  }
}>[]
