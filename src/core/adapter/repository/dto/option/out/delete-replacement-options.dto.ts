import { Prisma } from '@prisma/client'

export type DeleteReplacementOptionsDto = Prisma.DeactivateOptionGetPayload<{
  include: {
    selectedOptionForDeactivation: {
      include: {
        optionType: true
      }
    }
  }
}>[]
