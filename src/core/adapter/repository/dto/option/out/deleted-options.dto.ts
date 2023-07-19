import { Prisma } from '@prisma/client'

export type DeletedOptionsDto = Prisma.DeleteOptionGetPayload<{
  include: {
    optionToDelete: {
      include: {
        optionType: true
      }
    }
  }
}>[]
