import { Injectable } from '@nestjs/common'
import { Car, CarDrive, CarEngine, CarMission, CarType, Drive, Engine, Mission, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

type CarLowPrice = { modelPrice: number }
type ModelFilters = Prisma.CarGetPayload<{
  select: {
    carEngine: {
      select: {
        engine: true
      }
    }
    carMission: {
      select: {
        mission: true
      }
    }
    carDrive: {
      select: {
        drive: true
      }
    }
  }
}>

@Injectable()
export class modelRepository {
  constructor(private prisma: PrismaService) {}

  async findCars(): Promise<Car[]> {
    return await this.prisma.car.findMany()
  }

  async findCarType(carTypeId: number): Promise<CarType | null> {
    return await this.prisma.carType.findUnique({
      where: {
        carTypeId
      }
    })
  }

  async getCarLowPrice(carId: number): Promise<CarLowPrice | null> {
    return await this.prisma.carModel.findFirst({
      where: {
        carId
      },
      select: {
        modelPrice: true
      },
      orderBy: {
        modelPrice: 'asc'
      },
      take: 1
    })
  }

  async getModelFilters(carCode: string): Promise<ModelFilters | null> {
    return await this.prisma.car.findUnique({
      where: {
        carCode
      },
      select: {
        carEngine: {
          select: {
            engine: true
          }
        },
        carMission: {
          select: {
            mission: true
          }
        },
        carDrive: {
          select: {
            drive: true
          }
        }
      }
    })
  }
}
