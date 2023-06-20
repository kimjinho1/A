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
            carTypeCode: car.carTypeCode
          }
        })
        if (type === null) {
          return
        }
        const carModels = await this.prisma.carModel.findMany({
          where: {
            carCode: car.carCode
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
          carTypeCode: car.carTypeCode,
          carTypeName: type.carTypeName,
          carLowPrice: carModels[0].modelPrice
        }
      })
    )
    return data
  }
}
