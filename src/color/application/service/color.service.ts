import { Inject, NotFoundException } from '@nestjs/common'
import { ColorRepositoryPort } from '../port/repository/color-repository.port'
import { ColorServicePort } from '../port/web/color-serivce.port'
import { ChangeableCarModelsWithTrimDto, IntColorInfos } from '../port/web/dto/out'

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

    const selectableIntColors = await this.colorRepository.getSelectableIntColorIds(carModel.carId, carModel.trimId)
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

  async getChangeableCarModelsWithTrimByIntColor(
    modelCode: string,
    intColorCode: string,
    extColorCode: string
  ): Promise<ChangeableCarModelsWithTrimDto> {
    const carModel = await this.colorRepository.getCarModel(modelCode)
    if (carModel === null) {
      throw new NotFoundException('존재하지 않는 차량 모델 코드입니다.')
    }

    const intColor = await this.colorRepository.getIntColor(intColorCode)
    if (intColor === null) {
      throw new NotFoundException('존재하지 않는 내장색상 코드입니다.')
    }

    const extColor = await this.colorRepository.getExtColor(extColorCode)
    if (extColor === null) {
      throw new NotFoundException('존재하지 않는 외장색상 코드입니다.')
    }

    const intExtColor = await this.colorRepository.getIntExtColor(intColor.intColorId, extColor.extColorId)
    if (intExtColor === null) {
      throw new NotFoundException('선택하신 외장색과 함께 제공되지 않는 색상입니다.\n외장색상을 변경해주세요.')
    }

    const modelFilterIdsDto = {
      carId: carModel.carId,
      engineId: carModel.engineId,
      missionId: carModel.missionId,
      driveId: carModel.driveId,
      trimId: carModel.trimId
    }
    const anotherCarModelsWithTrim = await this.colorRepository.getAnotherCarModelsWithTrim(modelFilterIdsDto)
    if (anotherCarModelsWithTrim.length === 0) {
      throw new NotFoundException('다른 트림 정보가 존재하지 않는 차량 모델 코드입니다.')
    }

    const changeableCarModelsWithTrim = (
      await Promise.all(
        anotherCarModelsWithTrim.map(async carModelWithTrim => {
          const trimIntColor = await this.colorRepository.getTrimIntColor(
            carModelWithTrim.trim.trimId,
            intColor.intColorId
          )
          if (trimIntColor !== null) {
            return carModelWithTrim
          }
          return null
        })
      )
    ).find(data => data !== null)
    if (changeableCarModelsWithTrim === null || changeableCarModelsWithTrim === undefined) {
      throw new NotFoundException('변경할 수 있는 트림 정보가 존재하지 않습니다.')
    }

    const result = {
      modelCode: changeableCarModelsWithTrim.modelCode,
      modelPrice: changeableCarModelsWithTrim.modelPrice,
      modelImagePath: changeableCarModelsWithTrim.modelImagePath,
      trimName: changeableCarModelsWithTrim.trim.trimName
    }

    return result
  }
}
