import { Injectable } from '@nestjs/common'
import { CarModel, Option } from '@prisma/client'
import { OptionInfosDto } from 'src/core/application/port/repository/dto/option/out'
import { PrismaService } from 'src/prisma.service'

@Injectable()
// export class ModelRepository implements ModelRepositoryPort {
export class OptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCarModel(modelCode: string): Promise<CarModel | null> {
    return await this.prisma.carModel.findUnique({
      where: {
        modelCode
      }
    })
  }

  async getOptions(modelId: number): Promise<OptionInfosDto> {
    return await this.prisma.option.findMany({
      where: {
        carModelOption: {
          some: {
            modelId
          }
        }
      },
      include: {
        optionType: true
      }
    })
  }

  async getUnselectableOptionIds(trimId: number, modelId: number): Promise<Pick<Option, 'optionId'>[]> {
    return await this.prisma.option.findMany({
      where: {
        carModelOption: {
          some: {
            modelId
          }
        },
        optionToActivate: {
          some: {
            trimId
          }
        }
      },
      select: {
        optionId: true
      }
    })
  }
}