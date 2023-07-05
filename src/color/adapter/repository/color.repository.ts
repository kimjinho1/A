import { Injectable } from '@nestjs/common'
import { CarModel, ExtColor, IntColor, IntExtColor, TrimIntColor } from '@prisma/client'
import { ColorRepositoryPort } from 'src/color/application/port/repository/color-repository.port'
import { ModelFilterIdsDto } from 'src/color/application/port/repository/dto/in'
import { AnotherCarModelsWithTrimDto, SelectableIntColorIdsDto } from 'src/color/application/port/repository/dto/out'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ColorRepository implements ColorRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async getCarModel(modelCode: string): Promise<CarModel | null> {
    return await this.prisma.carModel.findUnique({
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

  async getSelectableIntColorIds(carId: number, trimId: number): Promise<SelectableIntColorIdsDto> {
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

  async getIntColor(intColorCode: string): Promise<IntColor | null> {
    return await this.prisma.intColor.findFirst({
      where: {
        intColorCode
      }
    })
  }

  async getExtColor(extColorCode: string): Promise<ExtColor | null> {
    return await this.prisma.extColor.findFirst({
      where: {
        extColorCode
      }
    })
  }

  async getIntExtColor(intColorId: number, extColorId: number): Promise<IntExtColor | null> {
    return await this.prisma.intExtColor.findFirst({
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

  async getTrimIntColor(trimId: number, intColorId: number): Promise<TrimIntColor | null> {
    return await this.prisma.trimIntColor.findFirst({
      where: {
        trimId,
        intColorId
      }
    })
  }
}
