import { CarModel, IntColor } from '@prisma/client'
import { SelectIntColorsDto } from './dto/out'

export interface ColorRepositoryPort {
  getCarModel(modelCode: string): Promise<CarModel | null>

  getIntColorsByCarAndTrim(carId: number, trimId: number): Promise<SelectIntColorsDto>
}

export const ColorRepositoryPort = Symbol('ColorRepositoryPort')
