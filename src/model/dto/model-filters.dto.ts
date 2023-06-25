import { Prisma } from '@prisma/client'

export type ModelFiltersDto = Prisma.CarGetPayload<{
  select: {
    carEngine: {
      select: {
        engine: true
      }
    }
    carMission: {
      select: {
        mission: true
      }
    }
    carDrive: {
      select: {
        drive: true
      }
    }
  }
}>
