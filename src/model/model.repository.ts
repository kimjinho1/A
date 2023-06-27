import { Injectable } from '@nestjs/common'
import { Car, CarType, Drive, Engine, Mission } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import internal from 'stream'
import { CarLowPriceDto, ModelFiltersDto, TrimInfosDto } from './dto'
import { ModelFiltersRequestDto, ValidatedModelFiltersRequestDto } from './dto/request'

@Injectable()
export class modelRepository {
  constructor(private prisma: PrismaService) {}

  async getCar(carCode: string): Promise<Car | null> {
    return await this.prisma.car.findUnique({
      where: {
        carCode
      }
    })
  }

  async getCars(): Promise<Car[]> {
    return await this.prisma.car.findMany()
  }

  async getEngine(engineCode: string): Promise<Engine | null> {
    return await this.prisma.engine.findUnique({
      where: {
        engineCode
      }
    })
  }

  async getMission(missionCode: string): Promise<Mission | null> {
    return await this.prisma.mission.findUnique({
      where: {
        missionCode
      }
    })
  }

  async getDrive(driveCode: string): Promise<Drive | null> {
    return await this.prisma.drive.findUnique({
      where: {
        driveCode
      }
    })
  }

  async getCarType(carTypeId: number): Promise<CarType | null> {
    return await this.prisma.carType.findUnique({
      where: {
        carTypeId
      }
    })
  }

  async getCarLowPrice(carId: number): Promise<CarLowPriceDto | null> {
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

  async getModelFilters(carCode: string): Promise<ModelFiltersDto | null> {
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

  async getTrims(vaildatedModelFilters: ValidatedModelFiltersRequestDto): Promise<TrimInfosDto[]> {
    const { carId, engineId, missionId, driveId } = vaildatedModelFilters
    return await this.prisma.carModel.findMany({
      where: {
        carId,
        engineId,
        missionId,
        driveId
      },
      select: {
        trim: {
          select: {
            trimCode: true,
            trimName: true
          }
        },
        modelId: true,
        modelCode: true,
        modelImagePath: true,
        modelPrice: true
      }
    })
  }
}
