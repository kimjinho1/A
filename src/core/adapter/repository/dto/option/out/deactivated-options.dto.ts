import { Prisma } from '@prisma/client'

export type DeactivatedOptionsDto = Prisma.DeactivateOptionGetPayload<{
  include: {
    optionToDeactivate: {
      include: {
        optionType: true
      }
    }
  }
}>[]
