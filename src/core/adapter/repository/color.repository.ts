import { Injectable } from '@nestjs/common'
import { CarModel, ExtColor, IntColor, IntExtColor, TrimIntColor } from '@prisma/client'
import { ColorRepositoryPort } from 'src/core/application/port/repository/color-repository.port'
import { ModelFilterIdsDto } from 'src/core/application/port/repository/dto/color/in'
import { AnotherCarModelsWithTrimDto } from 'src/core/application/port/repository/dto/color/out'
import { PrismaService } from 'src/prisma.service'

// export class ColorRepository implements ColorRepositoryPort {
@Injectable()
export class ColorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCarModel(modelCode: string): Promise<CarModel> {
    return await this.prisma.carModel.findUniqueOrThrow({
      where: { modelCode }
    })
  }

  async getAllIntColors(carId: number): Promise<IntColor[]> {
    return await this.prisma.intColor.findMany({
      where: {
        carId
      }
    })
  }

  async getAllExtColors(carId: number): Promise<ExtColor[]> {
    return await this.prisma.extColor.findMany({
      where: {
        carId
      }
    })
  }

  async getSelectableIntColorIds(carId: number, trimId: number): Promise<Pick<IntColor, 'intColorId'>[]> {
    return await this.prisma.intColor.findMany({
      where: {
        carId: carId,
        trimIntColor: {
          some: {
            trimId: trimId
          }
        }
      },
      select: {
        intColorId: true
      }
    })
  }

  async getSelectableIntColorIdsByExtColor(
    carId: number,
    trimId: number,
    extColorId: number
  ): Promise<Pick<IntColor, 'intColorId'>[]> {
    return await this.prisma.intColor.findMany({
      where: {
        carId: carId,
        trimIntColor: {
          some: {
            trimId
          }
        },
        intExtColor: {
          some: {
            extColorId
          }
        }
      },
      select: {
        intColorId: true
      }
    })
  }

  async getSelectableExtColorIds(carId: number, intColorId: number): Promise<Pick<ExtColor, 'extColorId'>[]> {
    return await this.prisma.extColor.findMany({
      where: {
        carId: carId,
        intExtColor: {
          some: {
            intColorId
          }
        }
      },
      select: {
        extColorId: true
      }
    })
  }

  async getIntColor(intColorCode: string): Promise<IntColor> {
    return await this.prisma.intColor.findFirstOrThrow({
      where: {
        intColorCode
      }
    })
  }

  async getExtColor(carId: number, extColorCode: string): Promise<ExtColor> {
    return await this.prisma.extColor.findFirstOrThrow({
      where: {
        carId,
        extColorCode
      }
    })
  }

  async getIntExtColor(intColorId: number, extColorId: number): Promise<IntExtColor> {
    return await this.prisma.intExtColor.findFirstOrThrow({
      where: {
        intColorId,
        extColorId
      }
    })
  }

  async getAnotherCarModelsWithTrim(modelFilterIdsDto: ModelFilterIdsDto): Promise<AnotherCarModelsWithTrimDto> {
    const { carId, engineId, missionId, driveId, trimId } = modelFilterIdsDto
    return await this.prisma.carModel.findMany({
      where: {
        carId,
        engineId,
        missionId,
        driveId,
        NOT: {
          trimId
        }
      },
      orderBy: {
        modelPrice: 'asc'
      },
      select: {
        modelCode: true,
        modelPrice: true,
        modelImagePath: true,
        trim: true
      }
    })
  }

  async getTrimIntColor(trimId: number, intColorId: number): Promise<TrimIntColor> {
    return await this.prisma.trimIntColor.findFirstOrThrow({
      where: {
        trimId,
        intColorId
      }
    })
  }
}
