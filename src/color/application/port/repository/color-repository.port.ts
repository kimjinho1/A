import { CarModel, IntColor } from '@prisma/client'
import { SelectableIntColorIdsDto } from './dto/out'

export interface ColorRepositoryPort {
  getCarModel(modelCode: string): Promise<CarModel | null>

  getAllIntColors(carId: number): Promise<IntColor[]>

  getSelectableIntColors(carId: number, trimId: number): Promise<SelectableIntColorIdsDto>
}

export const ColorRepositoryPort = Symbol('ColorRepositoryPort')
