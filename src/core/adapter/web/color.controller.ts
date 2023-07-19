import { Controller, Get, Query } from '@nestjs/common'
import { ChangeableCarModelsWithTrimDto, IntColorInfos } from 'src/core/adapter/web/dto/color/out'
import { ColorService } from 'src/core/application/service/color.service'

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  /** 내장색상 정보 반환 */
  @Get('/int-color')
  async getIntColorInfos(
    @Query('modelCode') modelCode: string,
    @Query('extColorCode') extColorCode: string
  ): Promise<IntColorInfos> {
    /** 모델 기준으로 내장색상 정보 반환 */
    if (extColorCode === '' || extColorCode === undefined) {
      return await this.colorService.getIntColorInfos(modelCode)
    }
    /** 모델과 외장색상 기준으로 내장색상 정보반환 */
    return await this.colorService.getIntColorInfosByExtColor(modelCode, extColorCode)
  }

  /** 외장색상 정보 반환 */
  @Get('/ext-color')
  async getExtColorsByIntColorCode(
    @Query('modelCode') modelCode: string,
    @Query('intColorCode') intColorCode: string
  ): Promise<any> {
    return await this.colorService.getExtColorInfos(modelCode, intColorCode)
  }

  /**
   * 내장색상 선택시 변경가능한 트림, 모델 정보, 삭제 추가되어야하는 옵션들의 정보를 반환
   * EX) 투싼 Inspiration 모델에서는 블랙모노톤 선택이 안되는데,
   * 이 경우에 블랙모노튼을 선택할 시 블랙모노톤이 선택가능한 다른 차량 트림, 모델 정보, 옵션들 정보를 반환함 */
  @Get('/change-int-color')
  async getChangeableCarModelsWithTrimByIntColor(
    @Query('modelCode') modelCode: string,
    @Query('intColorCode') intColorCode: string,
    @Query('beforeCode') beforeCode: string
  ): Promise<ChangeableCarModelsWithTrimDto> {
    return await this.colorService.getChangeableCarModelsWithTrimByIntColor(modelCode, intColorCode, beforeCode)
  }
}
