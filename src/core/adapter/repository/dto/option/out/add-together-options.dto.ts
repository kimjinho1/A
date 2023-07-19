import { Prisma } from '@prisma/client'

export type AddTogetherOptionsDto = Prisma.ActivateOptionGetPayload<{
  include: {
    selectedOptionForActivation: {
      include: {
        optionType: true
      }
    }
  }
}>[]
