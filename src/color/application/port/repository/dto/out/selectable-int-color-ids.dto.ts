import { Prisma } from '@prisma/client'

export type SelectableIntColorIdsDto = Prisma.TrimIntColorGetPayload<{
  select: {
    intColorId: true
  }
}>[]
