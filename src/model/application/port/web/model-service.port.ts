import { Car } from '@prisma/client'
import { CarInfosDto } from '../repository/dto/output'
import { ModelFilterCodesDto } from './dto/in'
import { CarInfo, CarTypeWithCarInfosDto, ModelFiltersDto, ModelInfoDto, TrimInfosDto } from './dto/out'

export interface ModelServicePort {
  getCarInfo(carCode: string): Promise<Car>

  getCarInfos(): Promise<CarTypeWithCarInfosDto>

  getModelFilters(carCode: string): Promise<ModelFiltersDto>

  getTrims(modelFiltersDto: ModelFilterCodesDto): Promise<TrimInfosDto>

  getCarModelInfo(modelCode: string): Promise<ModelInfoDto>

  /** Utils */
  extrectCarInfo(carInfo: CarInfosDto): Promise<CarInfo[]>
}

export const ModelServicePort = Symbol('ModelServicePort')
