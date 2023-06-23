import { Injectable } from '@nestjs/common'
import { CarModel } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async getMenu(): Promise<any> {
    const carList = await this.prisma.car.findMany()
    const data = Promise.all(
      carList.map(async car => {
        const type = await this.prisma.carType.findUnique({
          where: {
            carTypeId: car.carTypeId
          }
        })
        if (!type) {
          return
        }
        const carModels = await this.prisma.carModel.findMany({
          where: {
            carId: car.carId
          },
          select: {
            modelPrice: true
          },
          orderBy: {
            modelPrice: 'asc'
          },
          take: 1
        })
        return {
          carCode: car.carCode,
          carName: car.carName,
          carTypeCode: type.carTypeCode,
          carTypeName: type.carTypeName,
          carLowPrice: carModels[0].modelPrice
        }
      })
    )
    return data
  }

  async getIntColorsByModelCode(modelCode: string) {
    // const modelCode = 'NXJJ5DCT2'
    // const extColorCode = 'B6S'

    const carModel = await this.prisma.carModel.findUnique({
      where: { modelCode },
      select: {
        carId: true,
        trimId: true
      }
    })

    if (!carModel) {
      throw new Error('CarModel not found')
    }

    const { carId, trimId } = carModel

    const intColors = await this.prisma.carTrimIntColor.findMany({
      where: {
        carId,
        trimId
      },
      select: {
        intColor: true
      }
    })
    return intColors
  }

  async getExtColorsByIntColorCode(intColorCode: string) {
    const intColor = await this.prisma.intColor.findUnique({
      where: {
        intColorCode
      }
    })

    if (!intColor) {
      throw new Error('intColor not found')
    }

    const extColors = await this.prisma.intExtColor.findMany({
      where: { intColorId: intColor.intColorId },
      select: {
        extColor: true
      }
    })

    return extColors.map(extColor => extColor.extColor)
  }
}
