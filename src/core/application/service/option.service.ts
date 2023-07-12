import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CarModel, Option } from '@prisma/client'
import { OptionRepository } from 'src/core/adapter/repository/option.repository'
import { OptionsDto, OptionInfosDto, ColorsDto } from '../port/web/dto/option/out'
import { ColorRepository } from 'src/core/adapter/repository/color.repository'
import { ColorService } from './color.service'

// export class OptionService implements OptionServicePort {
@Injectable()
export class OptionService {
  constructor(
    // @Inject(OptionRepositoryPort) private readonly optionRepository: OptionRepositoryPort
    private readonly optionRepository: OptionRepository,
    private readonly colorService: ColorService
  ) {}

  /**
   * 모델 기준으로 옵선들 정보 반환
   */
  async getOptions(modelCode: string): Promise<OptionInfosDto> {
    const carModel = await this.getCarModel(modelCode)

    const options = await this.optionRepository.getOptions(carModel.modelId)
    if (options.length === 0) {
      throw new NotFoundException('선택 가능한 옵션이 없습니다')
    }

    const unselectableOptions = await this.optionRepository.getUnselectableOptionIds(carModel.trimId, carModel.modelId)
    const unselectableOptionIds = new Set(unselectableOptions.map(unselectableOption => unselectableOption.optionId))
    const result = options.map(option => {
      return {
        optionId: option.optionId,
        optionCode: option.optionCode,
        optionName: option.optionName,
        optionPrice: option.optionPrice,
        optionImagePath: option.optionImagePath,
        optionTypeName: option.optionType.optionTypeName,
        isSelectable: !unselectableOptionIds.has(option.optionId)
      }
    })
    result.sort((a, b) => (b.isSelectable ? 1 : 0) - (a.isSelectable ? 1 : 0))
    return result
  }

  /**
   * 활성화 가능한 옵션들 반환
   */
  async getAddPossibleOptions(modelCode: string, optionCode: string): Promise<OptionsDto> {
    const carModel = await this.getCarModel(modelCode)
    const option = await this.getOption(optionCode)
    await this.checkCarModelOption(carModel.modelId, option.optionId)

    const addPossibleOptions = await this.optionRepository.getAddPossibleOptions(option.optionId)

    const result = addPossibleOptions.map(addPossibleOption => {
      return {
        ...addPossibleOption.optionToActivate
      }
    })
    return result
  }

  /**
   * 비활성화되어야 하는 옵션들 반환
   */
  async getDeactivatedOptions(modelCode: string, optionCode: string): Promise<OptionsDto> {
    const carModel = await this.getCarModel(modelCode)
    const option = await this.getOption(optionCode)
    await this.checkCarModelOption(carModel.modelId, option.optionId)

    const deactivatedOptions = await this.optionRepository.getDeactivatedOptions(option.optionId)
    const deletedOptions = await this.optionRepository.getDeletedOptions(option.optionId)

    const result = deactivatedOptions
      .map(deactivatedOption => {
        return {
          ...deactivatedOption.optionToDeactivate
        }
      })
      .concat(
        deletedOptions.map(deleteOption => {
          return {
            ...deleteOption.optionToDelete
          }
        })
      )
    return result
  }

  /**
   * 특정 내장색상(세이지그린)이 선택되면 자동으로 선택되어야 하는 옵션들 반환
   */
  async getAutoSelectedOptions(modelCode: string, intColorCode: string): Promise<OptionsDto> {
    const carModel = await this.getCarModel(modelCode)
    const intColor = await this.colorService.getIntColor(intColorCode)
    await this.colorService.checkTrimIntColor(carModel.trimId, intColor.intColorId)

    const autoSelectedOptions = await this.optionRepository.getAutoSelectedOptions(intColor.intColorId)

    const result = autoSelectedOptions.map(autoSelectedOption => {
      return {
        ...autoSelectedOption.option
      }
    })
    return result
  }

  /**
   * 특정 옵션(세이지 그린 인테리어 컬러)이 선택되면 자동으로 선택되어야 하는 색상들 반환
   */
  async getAutoSelectedColors(modelCode: string, OptionCode: string): Promise<ColorsDto> {
    const carModel = await this.getCarModel(modelCode)
    const option = await this.getOption(OptionCode)
    await this.checkCarModelOption(carModel.trimId, option.optionId)

    const autoSelectedColors = await this.optionRepository.getAutoSelectedColors(option.optionId)

    const result = autoSelectedColors.map(autoSelectedColor => {
      return {
        ...autoSelectedColor.intColor
      }
    })
    return result
  }

  /**
   * Utils
   */
  async getCarModel(modelCode: string): Promise<CarModel> {
    const carModel = await this.optionRepository.getCarModel(modelCode)
    if (carModel === null) {
      throw new NotFoundException('존재하지 않는 차량 모델 코드입니다')
    }
    return carModel
  }

  async getOption(optionCode: string): Promise<Option> {
    const option = await this.optionRepository.getOption(optionCode)
    if (option === null) {
      throw new NotFoundException('존재하지 않는 옵션 코드입니다')
    }
    return option
  }

  async checkCarModelOption(modelId: number, optionId: number): Promise<void> {
    const carModelOption = await this.optionRepository.getCarModelOption(modelId, optionId)
    if (carModelOption === null) {
      throw new BadRequestException('호환되지 않는 모델과 옵션 코드입니다')
    }
  }
}
