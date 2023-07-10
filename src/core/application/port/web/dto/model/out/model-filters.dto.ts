import { Drive, Engine, Mission } from '@prisma/client'

export type ModelFiltersDto = {
  engines: Engine[]
  missions: Mission[]
  drives: Drive[]
}
