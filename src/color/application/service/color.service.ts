import { Inject, NotFoundException } from '@nestjs/common'
import { ColorRepositoryPort } from '../port/repository/color-repository.port'
import { ColorServicePort } from '../port/web/color-serivce.port'
import { IntColorInfos } from '../port/web/dto/out'

export class ColorService implements ColorServicePort {
  constructor(@Inject(ColorRepositoryPort) private readonly colorRepository: ColorRepositoryPort) {}

  async getIntColorInfos(modelCode: string): Promise<IntColorInfos> {
    const carModel = await this.colorRepository.getCarModel(modelCode)
    if (carModel === null) {
      throw new NotFoundException('존재하지 않는 차량 모델 코드입니다.')
    }

    const allIntColors = await this.colorRepository.getAllIntColors(carModel.carId)
    if (allIntColors.length === 0) {
      throw new NotFoundException('모델의 차량 코드와 매칭되는 내장색상이 없습니다.')
    }

    const selectableIntColors = await this.colorRepository.getSelectableIntColors(carModel.carId, carModel.trimId)
    if (selectableIntColors.length === 0) {
      throw new NotFoundException('모델의 차량 코드와 트림 코드에 매칭되는 내장색상이 없습니다.')
    }
    const selectableIntColorIds = selectableIntColors.map(intColor => intColor.intColorId)

    const result = allIntColors.map(intColor => {
      return {
        ...intColor,
        isSelectable: selectableIntColorIds.includes(intColor.intColorId)
      }
    })
    return result
  }
}
