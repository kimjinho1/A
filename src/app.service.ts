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

  async getIntColors(modelCode: string, extColorCode: string) {
    //   // const modelCode = 'NXJJ5DCT2'
    //   // const extColorCode = 'B6S'
    //   const carModel = await this.prisma.carModel.findUnique({
    //     where: { modelCode },
    //     include: {
    //       trim: {
    //         include: {
    //           carTrimIntColor: {
    //             include: {
    //               intColor: {
    //                 include: {
    //                   intExtColor: true
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   })
    //   if (!carModel) {
    //     throw new Error('CarModel not found')
    //   }
    //   console.log(carModel)
    //   console.log(carModel.trim)
    //   console.log(carModel.trim.carTrimIntColor)
    //   const intColors = carModel.trim.carTrimIntColor
    //     .map(trimIntColor => trimIntColor.intColor)
    //     .filter(intColor => intColor.intExtColor.some(intExt => intExt.extColorCode === extColorCode))
    //     .map(({ intExtColor, ...rest }) => rest)
    //   return intColors
  }
}
