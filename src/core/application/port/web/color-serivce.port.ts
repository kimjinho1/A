import { ChangeableCarModelsWithTrimDto, ExtColorInfos, IntColorInfos } from './dto/color/out'

export interface ColorServicePort {
  getIntColorInfos(modelCode: string): Promise<IntColorInfos>

  getChangeableCarModelsWithTrimByIntColor(
    modelCode: string,
    intColorCode: string,
    extColorCode: string
  ): Promise<ChangeableCarModelsWithTrimDto>

  getExtColorInfos(modelCode: string, intColorCode: string): Promise<ExtColorInfos>
}

export const ColorServicePort = Symbol('ColorServicePort')
