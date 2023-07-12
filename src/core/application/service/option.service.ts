import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CarModel, CarModelOption, Option } from '@prisma/client'
import { OptionRepository } from 'src/core/adapter/repository/option.repository'
import { AddPossibleOptionsDto, OptionInfo, OptionInfosDto } from '../port/web/dto/option/out'

// export class OptionService implements OptionServicePort {
@Injectable()
export class OptionService {
  constructor(
    // @Inject(OptionRepositoryPort) private readonly optionRepository: OptionRepositoryPort
    private readonly optionRepository: OptionRepository
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

    // const groupedOptions = transformedAndSortedOptions.reduce<{ [key: string]: OptionInfo[] }>((acc, option) => {
    //   const { optionTypeName } = option
    //   if (!acc[optionTypeName]) {
    //     acc[optionTypeName] = []
    //   }
    //   acc[optionTypeName].push(option)
    //   return acc
    // }, {})

    return result
  }

  async getAddPossibleOptions(modelCode: string, optionCode: string): Promise<AddPossibleOptionsDto> {
    const carModel = await this.getCarModel(modelCode)
    const option = await this.getOption(optionCode)
    const carModelOption = await this.getCarModelOption(carModel.modelId, option.optionId)
    const addPossibleOptions = await this.optionRepository.getAddPossibleOptions(option.optionId)

    const result = addPossibleOptions.map(addPossibleOption => {
      return {
        ...addPossibleOption.optionToActivate
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

  async getCarModelOption(modelId: number, optionId: number): Promise<CarModelOption> {
    const carModelOption = await this.optionRepository.getCarModelOption(modelId, optionId)
    if (carModelOption === null) {
      throw new BadRequestException('호환되지 않는 모델과 옵션 코드입니다')
    }
    return carModelOption
  }
}
