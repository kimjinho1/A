import { Prisma } from '@prisma/client'

export type SelectableExtColorIdsDto = Prisma.ExtColorGetPayload<{
  select: {
    extColorId: true
  }
}>[]
