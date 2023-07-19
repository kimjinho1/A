import { Prisma } from '@prisma/client'

export type SelectableIntColorIdsDto = Prisma.IntColorGetPayload<{
  select: {
    intColorId: true
  }
}>[]
