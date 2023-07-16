import { Car, CarModel, CarType, Drive, Engine, Mission } from '@prisma/client'
import { CarInfosDto, ModelFiltersDto, ModelInfoDto, TrimInfosDto } from './dto/model/output'

export interface ModelRepositoryPort {
  getCar(carCode: string): Promise<Car>

  getCars(): Promise<Car[]>

  getCarInfos(): Promise<CarInfosDto[]>

  getEngine(engineCode: string): Promise<Engine>

  getMission(missionCode: string): Promise<Mission>

  getDrive(driveCode: string): Promise<Drive | null>

  getCarType(carTypeId: number): Promise<CarType>

  getCarLowPrice(carId: number): Promise<Pick<CarModel, 'modelPrice'>>

  getModelFilters(carCode: string): Promise<ModelFiltersDto>

  getTrims(carId: number, engineId: number, missionId: number, driveId: number | null): Promise<TrimInfosDto>

  getCarModelInfo(modelCode: string): Promise<ModelInfoDto>
}

export const ModelRepositoryPort = Symbol('ModelRepositoryPort')
