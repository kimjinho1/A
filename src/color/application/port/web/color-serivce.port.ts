import { ExtColor, IntColor } from '@prisma/client'

export interface ColorServicePort {
  getIntColorsByModelCode(modelCode: string): Promise<IntColor[]>

  // getExtColorsByIntColorCode(intColorCode: string): Promise<ExtColor[]>
}

export const ColorServicePort = Symbol('ColorServicePort')
