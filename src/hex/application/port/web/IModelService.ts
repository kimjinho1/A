import { Car } from '@prisma/client'

export interface IModelService {
  getCarInfo(): Promise<Car>

  getCarInfos(): Promise<Car>
}
