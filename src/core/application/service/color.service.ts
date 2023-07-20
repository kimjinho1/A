import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { ColorRepository } from 'src/core/adapter/repository/color.repository'
import { ChangeableCarModelsWithTrimDto, ExtColorInfos, IntColorInfos } from '../../adapter/web/dto/color/out'
import { CarModel, ExtColor, IntColor } from '@prisma/client'
import { ErrorMessages } from 'src/common/exception/error-messages'
import { OptionService } from './option.service'

@Injectable()
export class ColorService {
  constructor(
    private readonly colorRepository: ColorRepository,
    @Inject(forwardRef(() => OptionService))
    private readonly optionService: OptionService
  ) {}

  /**
   * 모델 기준으로 내장색상 정보 반환
   */
  async getIntColorInfos(modelCode: string): Promise<IntColorInfos> {
    const carModel = await this.getCarModel(modelCode)
    const allIntColors = await this.getAllIntColors(carModel.carId)

    const selectableIntColors = await this.colorRepository.getSelectableIntColorIds(carModel.carId, carModel.trimId)
    if (selectableIntColors.length === 0) {
      throw new NotFoundException(ErrorMessages.NO_MATCHING_INTERIOR_COLOR)
    }

    const selectableIntColorIds = new Set(selectableIntColors.map(intColor => intColor.intColorId))
    const result = allIntColors.map(intColor => {
      return {
        ...intColor,
        isSelectable: selectableIntColorIds.has(intColor.intColorId)
      }
    })
    return this.sortSelectableFirst(result)
  }

  /**
   * 모델과 외장색상 기준으로 내장색상 정보반환
   */
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
      throw new NotFoundException(ErrorMessages.NO_MATCHING_COLOR_WITH_EXTERIOR)
    }

    const selectableIntColorIds = new Set(selectableIntColors.map(intColor => intColor.intColorId))
    const result = allIntColors.map(intColor => {
      return {
        ...intColor,
        isSelectable: selectableIntColorIds.has(intColor.intColorId)
      }
    })
    return this.sortSelectableFirst(result)
  }

  /**
   * 외장색상 정보 반환
   */
  async getExtColorInfos(modelCode: string, intColorCode: string): Promise<ExtColorInfos> {
    const carModel = await this.getCarModel(modelCode)
    const intColor = await this.getIntColor(intColorCode)
    await this.checkTrimIntColor(carModel.trimId, intColor.intColorId)
    const allExtColors = await this.getAllExtColors(carModel.carId)

    const selectableExtColors = await this.colorRepository.getSelectableExtColorIds(carModel.carId, intColor.intColorId)
    if (selectableExtColors.length === 0) {
      throw new NotFoundException(ErrorMessages.NO_MATCHING_EXTERIOR_COLOR)
    }

    const selectableExtColorIds = new Set(selectableExtColors.map(extColor => extColor.extColorId))
    const result = allExtColors.map(extColor => {
      return {
        ...extColor,
        isSelectable: selectableExtColorIds.has(extColor.extColorId)
      }
    })
    return this.sortSelectableFirst(result)
  }

  /**
   * 선택된 내장색상을 고를 수 있는 트림 정보를 반환
   */
  async getChangeableCarModelsWithTrimByIntColor(
    modelCode: string,
    intColorCode: string,
    beforeCode: string
  ): Promise<ChangeableCarModelsWithTrimDto> {
    const carModel = await this.getCarModel(modelCode)
    const intColor = await this.getIntColor(intColorCode)
    await this.checkTrimIntColor(carModel.trimId, intColor.intColorId)
    const optionCodes = beforeCode.length > 0 ? beforeCode.split(',') : []

    const beforeOptions = await Promise.all(
      optionCodes.map(async optionCode => {
        const option = await this.optionService.getOption(optionCode)
        await this.optionService.checkCarModelOption(carModel.modelId, option.optionId)
        return option
      })
    )

    const modelFilterIdsDto = {
      carId: carModel.carId,
      engineId: carModel.engineId,
      missionId: carModel.missionId,
      driveId: carModel.driveId,
      trimId: carModel.trimId
    }
    const anotherCarModelsWithTrim = await this.colorRepository.getAnotherCarModelsWithTrim(modelFilterIdsDto)
    if (anotherCarModelsWithTrim.length === 0) {
      throw new NotFoundException(ErrorMessages.NO_OTHER_TRIM)
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
      throw new NotFoundException(ErrorMessages.NO_CHANGEABLE_TRIM)
    }

    const newOptions = await this.optionService.getOptions(changeableCarModelWithTrim.modelCode)
    const newOptionCodes = new Set(newOptions.map(option => option.optionCode))
    const addOptions = await this.optionService.getAutoSelectedOptions(
      changeableCarModelWithTrim.modelCode,
      intColorCode
    )
    const removeOptionCodes = beforeOptions
      .filter(option => !newOptionCodes.has(option.optionCode))
      .map(option => option.optionCode)

    const result = {
      modelCode: changeableCarModelWithTrim.modelCode,
      modelPrice: changeableCarModelWithTrim.modelPrice,
      modelImagePath: changeableCarModelWithTrim.modelImagePath,
      trimName: changeableCarModelWithTrim.trim.trimName,
      addOptions,
      removeOptionCodes
    }
    return result
  }

  /**
   * Utils
   */
  sortSelectableFirst<T extends { isSelectable: boolean }>(result: T[]): T[] {
    return result.sort((a, b) => (b.isSelectable ? 1 : 0) - (a.isSelectable ? 1 : 0))
  }

  async getCarModel(modelCode: string): Promise<CarModel> {
    try {
      return await this.colorRepository.getCarModel(modelCode)
    } catch (error) {
      throw new NotFoundException(ErrorMessages.MODEL_NOT_FOUND)
    }
  }

  async getIntColor(intColorCode: string): Promise<IntColor> {
    try {
      return await this.colorRepository.getIntColor(intColorCode)
    } catch (error) {
      throw new NotFoundException(ErrorMessages.INVALID_INTERIOR_COLOR)
    }
  }

  async getExtColor(carId: number, extColorCode: string): Promise<ExtColor> {
    try {
      return await this.colorRepository.getExtColor(carId, extColorCode)
    } catch (error) {
      throw new NotFoundException(ErrorMessages.INVALID_EXTERIOR_COLOR)
    }
  }

  async getAllIntColors(carId: number): Promise<IntColor[]> {
    const allIntColors = await this.colorRepository.getAllIntColors(carId)
    if (allIntColors.length === 0) {
      throw new NotFoundException(ErrorMessages.NO_MATCHING_INTERIOR_COLOR)
    }
    return allIntColors
  }

  async getAllExtColors(carId: number): Promise<ExtColor[]> {
    const allExtColors = await this.colorRepository.getAllExtColors(carId)
    if (allExtColors.length === 0) {
      throw new NotFoundException(ErrorMessages.NO_MATCHING_EXTERIOR_COLOR)
    }
    return allExtColors
  }

  async checkTrimIntColor(trimId: number, intColorId: number): Promise<void> {
    try {
      await this.colorRepository.getTrimIntColor(trimId, intColorId)
    } catch (error) {
      throw new NotFoundException(ErrorMessages.NON_COMPATIBLE_INTERIOR_COLOR)
    }
  }

  async getIntExtColor(intColorId: number, extColorId: number): Promise<void> {
    try {
      await this.colorRepository.getIntExtColor(intColorId, extColorId)
    } catch (error) {
      throw new NotFoundException(ErrorMessages.NON_PROVIDED_COLOR_WITH_EXTERIOR)
    }
  }
}
