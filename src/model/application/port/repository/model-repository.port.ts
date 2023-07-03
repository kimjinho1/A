import { Car, CarType, Drive, Engine, Mission } from '@prisma/client'
import { ModelFilterDto } from './dto/input'
import { CarInfosDto, CarLowPriceDto, ModelFiltersDto, ModelInfoDto, TrimInfosDto } from './dto/output'

export interface ModelRepositoryPort {
  getCar(carCode: string): Promise<Car | null>

  getCars(): Promise<Car[]>

  getCarInfos(): Promise<CarInfosDto[]>

  getEngine(engineCode: string): Promise<Engine | null>

  getMission(missionCode: string): Promise<Mission | null>

  getDrive(driveCode: string): Promise<Drive | null>

  getCarType(carTypeId: number): Promise<CarType | null>

  getCarLowPrice(carId: number): Promise<CarLowPriceDto | null>

  getModelFilters(carCode: string): Promise<ModelFiltersDto | null>

  getTrims(modelFilters: ModelFilterDto): Promise<TrimInfosDto>

  getCarModelInfo(modelCode: string): Promise<ModelInfoDto | null>
}

export const ModelRepositoryPort = Symbol('ModelRepositoryPort')
