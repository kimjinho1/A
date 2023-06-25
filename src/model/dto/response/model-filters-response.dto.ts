import { Drive, Engine, Mission } from '@prisma/client'

export class ModelFiltersResponseDto {
  engines: Engine[]
  missions: Mission[]
  drives: Drive[]
}
