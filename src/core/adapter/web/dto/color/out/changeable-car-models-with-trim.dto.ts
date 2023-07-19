import { OptionInfo } from '../../option/out'

export type ChangeableCarModelsWithTrimDto = {
  modelCode: string
  modelPrice: number
  modelImagePath: string
  trimName: string
  addOptions: OptionInfo[]
  removeOptionCodes: string[]
}
