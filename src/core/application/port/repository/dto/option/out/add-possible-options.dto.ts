import { Prisma } from '@prisma/client'

export type AddPossibleOptionsDto = Prisma.ActivateOptionGetPayload<{
  include: {
    optionToActivate: {
      include: {
        optionType: true
      }
    }
  }
}>[]
