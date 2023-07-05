import { ChangeableCarModelsWithTrimDto, IntColorInfos } from './dto/out'

export interface ColorServicePort {
  getIntColorInfos(modelCode: string): Promise<IntColorInfos>

  getChangeableCarModelsWithTrimByIntColor(
    modelCode: string,
    intColorCode: string,
    extColorCode: string
  ): Promise<ChangeableCarModelsWithTrimDto>
}

export const ColorServicePort = Symbol('ColorServicePort')
