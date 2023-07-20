import { Injectable, NotFoundException } from '@nestjs/common'
import { ColorService } from './color.service'
import { ErrorMessages } from 'src/common/exception/error-messages'
import { EstimationInfoCommand } from 'src/core/adapter/web/command/estimation-info.command'
import { v4 as uuidv4 } from 'uuid'
import { OptionService } from './option.service'

@Injectable()
export class EstimationService {
  constructor(private readonly optionService: OptionService, private readonly colorService: ColorService) {}

  private estimationMap = new Map<string, EstimationInfoCommand>()

  /**
   * 유저의 차량 견적을 인메모리 캐시에 저장
   */
  async saveEstimation(estimationInfo: EstimationInfoCommand): Promise<string> {
    const { modelInfo, intColor, extColor, options } = estimationInfo
    const checkModel = await this.colorService.getCarModel(modelInfo.code)
    const checkIntColor = await this.colorService.getIntColor(intColor.code)
    const checkExtColor = await this.colorService.getExtColor(checkModel.carId, extColor.code)
    await this.colorService.checkTrimIntColor(checkModel.carId, checkIntColor.intColorId)
    await this.colorService.getIntExtColor(checkIntColor.intColorId, checkExtColor.extColorId)

    await Promise.all(
      options.map(async option => {
        const checkOption = await this.optionService.getOption(option.code)
        await this.optionService.checkCarModelOption(checkModel.modelId, checkOption.optionId)
      })
    )

    const hashKey = uuidv4()
    this.estimationMap.set(hashKey, estimationInfo)
    return hashKey
  }

  /**
   * 차량 견적을 반환
   */
  async getEstimation(estimationUrl: string): Promise<EstimationInfoCommand> {
    const estimationInfo = this.estimationMap.get(estimationUrl)
    if (estimationInfo === undefined) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND_ESTIMATION_URL)
    }

    return estimationInfo
  }
}
