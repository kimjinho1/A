import { CarModel, ExtColor, IntColor, IntExtColor, TrimIntColor } from '@prisma/client'
import { AnotherCarModelsWithTrimDto, SelectableExtColorIdsDto, SelectableIntColorIdsDto } from './dto/out'
import { ModelFilterIdsDto } from './dto/in'

export interface ColorRepositoryPort {
  getCarModel(modelCode: string): Promise<CarModel | null>

  getAllIntColors(carId: number): Promise<IntColor[]>

  getAllExtColors(carId: number): Promise<ExtColor[]>

  getSelectableIntColorIds(carId: number, trimId: number): Promise<SelectableIntColorIdsDto>

  getSelectableExtColorIds(carId: number, intColorId: number): Promise<SelectableExtColorIdsDto>

  getIntColor(intColorCode: string): Promise<IntColor | null>

  getExtColor(carId: number, extColorCode: string): Promise<ExtColor | null>

  getIntExtColor(intColorId: number, extColorId: number): Promise<IntExtColor | null>

  getAnotherCarModelsWithTrim(modelFilterIdsDto: ModelFilterIdsDto): Promise<AnotherCarModelsWithTrimDto>

  getTrimIntColor(trimId: number, intColorId: number): Promise<TrimIntColor | null>
}

export const ColorRepositoryPort = Symbol('ColorRepositoryPort')
