import { IntColorInfos } from './dto/out'

export interface ColorServicePort {
  getIntColorInfos(modelCode: string): Promise<IntColorInfos>

  // getExtColorsByIntColorCode(intColorCode: string): Promise<ExtColor[]>
}

export const ColorServicePort = Symbol('ColorServicePort')
