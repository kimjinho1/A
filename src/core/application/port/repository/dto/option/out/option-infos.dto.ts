import { Prisma } from '@prisma/client'

export type OptionInfosDto = Prisma.OptionGetPayload<{
  include: {
    optionType: true
  }
}>[]
