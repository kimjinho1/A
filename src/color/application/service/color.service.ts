import { Inject, NotFoundException } from '@nestjs/common'
import { ColorRepositoryPort } from '../port/repository/color-repository.port'
import { ColorServicePort } from '../port/web/color-serivce.port'
import { IntColor } from '@prisma/client'

export class ColorService implements ColorServicePort {
  constructor(@Inject(ColorRepositoryPort) private readonly colorRepository: ColorRepositoryPort) {}

  async getIntColorsByModelCode(modelCode: string): Promise<IntColor[]> {
    const carModel = await this.colorRepository.getCarModel(modelCode)
    if (carModel === null) {
      throw new NotFoundException('존재하지 않는 차량 모델 코드입니다.')
    }

    const intColors = await this.colorRepository.getIntColorsByCarAndTrim(carModel.carId, carModel.trimId)

    const result = intColors.map(intColor => intColor.intColor)
    return result
  }
}
