import { Drive, Engine, Mission } from '@prisma/client'

export default class ModelFilters {
  engines: Engine[]
  missions: Mission[]
  drives: Drive[]
}
