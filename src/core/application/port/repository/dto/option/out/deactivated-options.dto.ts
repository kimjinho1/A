import { Prisma } from '@prisma/client'

export type DeactivatedOptionsDto = Prisma.DeactivateOptionGetPayload<{
  select: {
    optionToDeactivate: {
      select: {
        optionId: true
        optionCode: true
        optionName: true
      }
    }
  }
}>[]
