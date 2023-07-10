import { Car } from '@prisma/client'
import { CarInfosDto } from '../repository/dto/model/output'
import { CarInfo, CarTypeWithCarInfosDto, ModelFiltersDto, ModelInfoDto, TrimInfosDto } from './dto/model/out'
import { GetTrimsCommand } from 'src/core/adapter/web/command/get-trims.command'

export interface ModelServicePort {
  getCarInfo(carCode: string): Promise<Car>

  getCarInfos(): Promise<CarTypeWithCarInfosDto>

  getModelFilters(carCode: string): Promise<ModelFiltersDto>

  getTrims(modelFiltersDto: GetTrimsCommand): Promise<TrimInfosDto>

  getCarModelInfo(modelCode: string): Promise<ModelInfoDto>

  /** Utils */
  extrectCarInfo(carInfo: CarInfosDto): Promise<CarInfo[]>
}

export const ModelServicePort = Symbol('ModelServicePort')
