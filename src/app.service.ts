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
        const carType = await this.prisma.carType.findUnique({
          where: {
            carTypeCode: car.carTypeCode
          },
          select: {
            carTypeName: true
          }
        })
        const carModels: CarModel[] = []
        const engines = await this.prisma.carEngine.findMany({
          where: { carCode: car.carCode }
        })
        for (const carEngine of engines) {
          const models = await this.prisma.carModel.findMany({
            where: { carEngineCode: carEngine.carEngineCode }
          })
          carModels.push(...models)
        }
        carModels.sort((a, b) => a.carModelPrice - b.carModelPrice)
        return {
          carTypeCode: car.carTypeCode,
          carTypeName: carType?.carTypeName,
          carCode: car.carCode,
          carName: car.carName,
          carLowPrice: carModels[0].carModelPrice
        }
      })
    )
    return data
  }
}
