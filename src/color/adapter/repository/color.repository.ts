import { Injectable } from '@nestjs/common'
import { CarModel } from '@prisma/client'
import { ColorRepositoryPort } from 'src/color/application/port/repository/color-repository.port'
import { SelectIntColorsDto } from 'src/color/application/port/repository/dto/out'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ColorRepository implements ColorRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async getCarModel(modelCode: string): Promise<CarModel | null> {
    return await this.prisma.carModel.findUnique({
      where: { modelCode }
    })
  }

  async getIntColorsByCarAndTrim(carId: number, trimId: number): Promise<SelectIntColorsDto> {
    return await this.prisma.carTrimIntColor.findMany({
      where: {
        carId,
        trimId
      },
      select: {
        intColor: true
      }
    })
  }
}
