import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ColorRepository } from 'src/core/adapter/repository/color.repository'
import { ColorRepositoryPort } from '../port/repository/color-repository.port'
import { ColorServicePort } from '../port/web/color-serivce.port'
import { ChangeableCarModelsWithTrimDto, ExtColorInfos, IntColorInfos } from '../port/web/dto/color/out'
import { CarModel, ExtColor, IntColor, IntExtColor } from '@prisma/client'

// export class ColorService implements ColorServicePort {
@Injectable()
export class ColorService {
  constructor(
    // @Inject(ColorRepositoryPort) private readonly colorRepository: ColorRepositoryPort
    private readonly colorRepository: ColorRepository
  ) {}

  /**
   * 모델 기준으로 내장색상 정보 반환
   * */
  async getIntColorInfos(modelCode: string): Promise<IntColorInfos> {
    const carModel = await this.getCarModel(modelCode)
    const allIntColors = await this.getAllIntColors(carModel.carId)

    const selectableIntColors = await this.colorRepository.getSelectableIntColorIds(carModel.carId, carModel.trimId)
    if (selectableIntColors.length === 0) {
      throw new NotFoundException('모델의 차량 코드와 트림 코드에 매칭되는 내장색상이 없습니다.')
    }

    const selectableIntColorIds = new Set(selectableIntColors.map(intColor => intColor.intColorId))
    const result = allIntColors.map(intColor => {
      return {
        ...intColor,
        isSelectable: selectableIntColorIds.has(intColor.intColorId)
      }
    })
    result.sort((a, b) => (b.isSelectable ? 1 : 0) - (a.isSelectable ? 1 : 0))
    return result
  }

  /**
   * 모델과 외장색상 기준으로 내장색상 정보반환
   * */
  async getIntColorInfosByExtColor(modelCode: string, extColorCode: string): Promise<IntColorInfos> {
    const carModel = await this.getCarModel(modelCode)
    const extColor = await this.getExtColor(carModel.carId, extColorCode)
    const allIntColors = await this.getAllIntColors(carModel.carId)

    const selectableIntColors = await this.colorRepository.getSelectableIntColorIdsByExtColor(
      carModel.carId,
      carModel.trimId,
      extColor.extColorId
    )
    if (selectableIntColors.length === 0) {
      throw new NotFoundException('외장색상과 매칭되는 내장색상이 없습니다.')
    }

    const selectableIntColorIds = new Set(selectableIntColors.map(intColor => intColor.intColorId))
    const result = allIntColors.map(intColor => {
      return {
        ...intColor,
        isSelectable: selectableIntColorIds.has(intColor.intColorId)
      }
    })
    result.sort((a, b) => (b.isSelectable ? 1 : 0) - (a.isSelectable ? 1 : 0))
    return result
  }

  /**
   * 외장색상 정보 반환
   * */
  async getExtColorInfos(modelCode: string, intColorCode: string): Promise<ExtColorInfos> {
    const carModel = await this.getCarModel(modelCode)
    const intColor = await this.getIntColor(intColorCode)
    const allExtColors = await this.getAllExtColors(carModel.carId)

    const selectableExtColors = await this.colorRepository.getSelectableExtColorIds(carModel.carId, intColor.intColorId)
    if (selectableExtColors.length === 0) {
      throw new NotFoundException('모델의 차량 코드와 트림 코드에 매칭되는 외장색상이 없습니다.')
    }

    const selectableExtColorIds = new Set(selectableExtColors.map(extColor => extColor.extColorId))
    const result = allExtColors.map(extColor => {
      return {
        ...extColor,
        isSelectable: selectableExtColorIds.has(extColor.extColorId)
      }
    })
    result.sort((a, b) => (b.isSelectable ? 1 : 0) - (a.isSelectable ? 1 : 0))
    return result
  }

  /**
   * 선택된 내장색상을 고를 수 있는 트림 정보를 반환
   * */
  async getChangeableCarModelsWithTrimByIntColor(
    modelCode: string,
    intColorCode: string,
    extColorCode: string
  ): Promise<ChangeableCarModelsWithTrimDto> {
    const carModel = await this.getCarModel(modelCode)
    const intColor = await this.getIntColor(intColorCode)
    const extColor = await this.getExtColor(carModel.carId, extColorCode)
    await this.checkIntExtColor(intColor.intColorId, extColor.extColorId)

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

    let changeableCarModelWithTrim = null
    for (const carModelWithTrim of anotherCarModelsWithTrim) {
      const trimIntColor = await this.colorRepository.getTrimIntColor(carModelWithTrim.trim.trimId, intColor.intColorId)
      if (trimIntColor !== null) {
        changeableCarModelWithTrim = carModelWithTrim
        break
      }
    }
    if (changeableCarModelWithTrim === null) {
      throw new NotFoundException('변경할 수 있는 트림 정보가 존재하지 않습니다.')
    }

    const result = {
      modelCode: changeableCarModelWithTrim.modelCode,
      modelPrice: changeableCarModelWithTrim.modelPrice,
      modelImagePath: changeableCarModelWithTrim.modelImagePath,
      trimName: changeableCarModelWithTrim.trim.trimName
    }
    return result
  }

  /**
   * Utils
   * */
  async getCarModel(modelCode: string): Promise<CarModel> {
    const carModel = await this.colorRepository.getCarModel(modelCode)
    if (carModel === null) {
      throw new NotFoundException('존재하지 않는 차량 모델 코드입니다.')
    }
    return carModel
  }

  async getIntColor(intColorCode: string): Promise<IntColor> {
    const intColor = await this.colorRepository.getIntColor(intColorCode)
    if (intColor === null) {
      throw new NotFoundException('존재하지 않는 내장색상 코드입니다.')
    }
    return intColor
  }

  async getExtColor(carId: number, extColorCode: string): Promise<ExtColor> {
    const extColor = await this.colorRepository.getExtColor(carId, extColorCode)
    if (extColor === null) {
      throw new NotFoundException('존재하지 않는 외장색상 코드입니다.')
    }
    return extColor
  }

  async getAllIntColors(carId: number): Promise<IntColor[]> {
    const allIntColors = await this.colorRepository.getAllIntColors(carId)
    if (allIntColors.length === 0) {
      throw new NotFoundException('모델의 차량 코드와 매칭되는 내장색상이 없습니다.')
    }
    return allIntColors
  }

  async getAllExtColors(carId: number): Promise<ExtColor[]> {
    const allExtColors = await this.colorRepository.getAllExtColors(carId)
    if (allExtColors.length === 0) {
      throw new NotFoundException('모델의 차량 코드와 매칭되는 내장색상이 없습니다.')
    }
    return allExtColors
  }

  async checkIntExtColor(intColorId: number, extColorId: number): Promise<void> {
    const intExtColor = await this.colorRepository.getIntExtColor(intColorId, extColorId)
    if (intExtColor === null) {
      throw new NotFoundException('선택하신 외장색상과 함께 제공되지 않는 색상입니다.\n외장색상을 변경해주세요.')
    }
  }
}
