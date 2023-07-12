import { Prisma } from '@prisma/client'

export type DeletedOptionsDto = Prisma.DeleteOptionGetPayload<{
  select: {
    optionToDelete: {
      select: {
        optionId: true
        optionCode: true
        optionName: true
      }
    }
  }
}>[]
