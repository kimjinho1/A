export class CarInfo {
  carCode: string
  carName: string
  carImagePath: string
  carLowPrice: number
}

export class CarTypeWithCarInfosResponseDto {
  carTypeCode: string
  carTypeName: string
  carInfos: CarInfo[]
}
