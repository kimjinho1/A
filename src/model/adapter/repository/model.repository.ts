import { Injectable } from '@nestjs/common'
import { Car, CarType, Drive, Engine, Mission } from '@prisma/client'
import { ModelRepositoryPort } from 'src/model/application/port/repository/model-repository.port'
import { PrismaService } from 'src/prisma.service'
import { ModelFilterDto } from 'src/model/application/port/repository/dto/input'
import {
  CarInfosDto,
  CarLowPriceDto,
  ModelFiltersDto,
  ModelInfoDto,
  TrimInfosDto
} from 'src/model/application/port/repository/dto/output'

@Injectable()
export class ModelRepository implements ModelRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

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

  async getCarInfos(): Promise<CarInfosDto[]> {
    return await this.prisma.carType.findMany({
      include: {
        car: true
      }
    })
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

  async getTrims(modelFilters: ModelFilterDto): Promise<TrimInfosDto> {
    const { carId, engineId, missionId, driveId } = modelFilters
    return await this.prisma.carModel.findMany({
      where: {
        carId,
        engineId,
        missionId,
        driveId
      },
      select: {
        modelId: true,
        modelCode: true,
        modelImagePath: true,
        modelPrice: true,
        trim: {
          select: {
            trimCode: true,
            trimName: true
          }
        }
      }
    })
  }

  async getCarModelInfo(modelCode: string): Promise<ModelInfoDto | null> {
    return await this.prisma.carModel.findUnique({
      where: {
        modelCode
      },
      select: {
        modelId: true,
        modelCode: true,
        modelName: true,
        modelPrice: true,
        car: {
          select: {
            carCode: true,
            carName: true
          }
        },
        trim: {
          select: {
            trimCode: true,
            trimName: true
          }
        }
      }
    })
  }
}
