export type CarInfo = {
  carCode: string
  carName: string
  carImagePath: string
  carLowPrice: number
}

export type CarTypeWithCarInfosDto = {
  carTypeCode: string
  carTypeName: string
  carInfos: CarInfo[]
}[]
