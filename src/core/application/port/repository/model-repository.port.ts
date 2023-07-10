import { Car, CarModel, CarType, Drive, Engine, Mission } from '@prisma/client'
import { CarInfosDto, ModelFiltersDto, ModelInfoDto, TrimInfosDto } from './dto/model/output'

export interface ModelRepositoryPort {
  getCar(carCode: string): Promise<Car | null>

  getCars(): Promise<Car[]>

  getCarInfos(): Promise<CarInfosDto[]>

  getEngine(engineCode: string): Promise<Engine | null>

  getMission(missionCode: string): Promise<Mission | null>

  getDrive(driveCode: string): Promise<Drive | null>

  getCarType(carTypeId: number): Promise<CarType | null>

  getCarLowPrice(carId: number): Promise<Pick<CarModel, 'modelPrice'> | null>

  getModelFilters(carCode: string): Promise<ModelFiltersDto | null>

  getTrims(carId: number, engineId: number, missionId: number, driveId: number | null): Promise<TrimInfosDto>

  getCarModelInfo(modelCode: string): Promise<ModelInfoDto | null>
}

export const ModelRepositoryPort = Symbol('ModelRepositoryPort')
