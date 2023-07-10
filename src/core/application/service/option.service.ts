import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CarModel } from '@prisma/client'
import { OptionRepository } from 'src/core/adapter/repository/option.repository'
import { OptionInfo, OptionInfosDto } from '../port/web/dto/option/out'

// export class OptionService implements OptionServicePort {
@Injectable()
export class OptionService {
  constructor(
    // @Inject(OptionRepositoryPort) private readonly optionRepository: OptionRepositoryPort
    private readonly optionRepository: OptionRepository
  ) {}

  /**
   * 모델 기준으로 옵선들 정보 반환
   * */
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
}
