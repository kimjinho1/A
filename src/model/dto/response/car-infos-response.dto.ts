class CarInfo {
  carCode: string
  carName: string
  carImagePath: string
  carLowPrice: number
}

export class CarInfosResponseDto {
  carTypeCode: string
  carTypeName: string
  carInfos: CarInfo[]
}
