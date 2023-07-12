import { Prisma } from '@prisma/client'

export type AddPossibleOptionsDto = Prisma.ActivateOptionGetPayload<{
  select: {
    optionToActivate: {
      select: {
        optionId: true
        optionCode: true
        optionName: true
      }
    }
  }
}>[]
