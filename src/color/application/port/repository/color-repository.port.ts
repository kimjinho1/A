import { CarModel, ExtColor, IntColor, IntExtColor, TrimIntColor } from '@prisma/client'
import { AnotherCarModelsWithTrimDto, SelectableIntColorIdsDto } from './dto/out'
import { ModelFilterIdsDto } from './dto/in'

export interface ColorRepositoryPort {
  getCarModel(modelCode: string): Promise<CarModel | null>

  getAllIntColors(carId: number): Promise<IntColor[]>

  getSelectableIntColorIds(carId: number, trimId: number): Promise<SelectableIntColorIdsDto>

  getIntColor(intColorCode: string): Promise<IntColor | null>

  getExtColor(extColorCode: string): Promise<ExtColor | null>

  getIntExtColor(intColorId: number, extColorId: number): Promise<IntExtColor | null>

  getAnotherCarModelsWithTrim(modelFilterIdsDto: ModelFilterIdsDto): Promise<AnotherCarModelsWithTrimDto>

  getTrimIntColor(trimId: number, intColorId: number): Promise<TrimIntColor | null>
}

export const ColorRepositoryPort = Symbol('ColorRepositoryPort')
