import { Prisma } from '@prisma/client'

export type AutoSelectedOptionsDto = Prisma.IntColorOptionGetPayload<{
  select: {
    option: {
      select: {
        optionId: true
        optionCode: true
        optionName: true
      }
    }
  }
}>[]
