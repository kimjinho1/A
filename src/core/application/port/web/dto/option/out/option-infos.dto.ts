export type OptionInfo = {
  optionId: number
  optionCode: string
  optionName: string
  optionPrice: number
  optionImagePath: string
  optionTypeName: string
  isSelectable: boolean
}

// export type OptionInfosDto = {
//   [key: string]: OptionInfo[]
// }

export type OptionInfosDto = OptionInfo[]
