import { Injectable } from '@nestjs/common'
import { CarModel, IntColor } from '@prisma/client'
import { ColorRepositoryPort } from 'src/color/application/port/repository/color-repository.port'
import { SelectableIntColorIdsDto } from 'src/color/application/port/repository/dto/out'
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

  async getSelectableIntColors(carId: number, trimId: number): Promise<SelectableIntColorIdsDto> {
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
}
