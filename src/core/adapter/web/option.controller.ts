import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common'
import { ChangedOptions, OptionInfosDto } from 'src/core/application/port/web/dto/option/out'
import { OptionService } from 'src/core/application/service/option.service'
import { EstimationInfoCommand } from './command/estimation-info.command'

@Controller('option')
export class OptionController {
  constructor(
    // @Inject(OptionServicePort) private readonly optionService: OptionServicePort
    private readonly optionService: OptionService
  ) {}

  /**
   * 모델 기준으로 옵선들 정보 반환
   */
  @Get()
  async getOptions(@Query('modelCode') modelCode: string): Promise<OptionInfosDto> {
    return await this.optionService.getOptions(modelCode)
  }

  /**
   * 활성화 가능한 옵션들 반환
   */
  @Get('/add-possible')
  async getAddPossibleOptions(
    @Query('modelCode') modelCode: string,
    @Query('optionCode') optionCode: string
  ): Promise<OptionInfosDto> {
    return await this.optionService.getAddPossibleOptions(modelCode, optionCode)
  }

  /**
   * 비활성화되어야 하는 옵션들 반환
   */
  @Get('/disable')
  async getDeactivatedOptions(
    @Query('modelCode') modelCode: string,
    @Query('optionCode') optionCode: string
  ): Promise<OptionInfosDto> {
    return await this.optionService.getDeactivatedOptions(modelCode, optionCode)
  }

  /**
   * 지워져야 하는 옵션들 반환
   */
  @Get('/delete')
  async getDeletedOptions(
    @Query('modelCode') modelCode: string,
    @Query('optionCode') optionCode: string
  ): Promise<OptionInfosDto> {
    return await this.optionService.getDeletedOptions(modelCode, optionCode)
  }

  /**
   * 특정 내장색상(세이지그린)이 선택되면 자동으로 선택되어야 하는 옵션들 반환
   */
  @Get('/auto-choice')
  async getAutoSelectedOptions(
    @Query('modelCode') modelCode: string,
    @Query('intColorCode') intColorCode: string
  ): Promise<OptionInfosDto> {
    return await this.optionService.getAutoSelectedOptions(modelCode, intColorCode)
  }

  /**
   * 같이 상태가 바뀌어야 하는 종속성 있는 옵션들 반환
   * 같이 선택(EX -> 컨비니언스1 & 인포테이먼트 내비)
   * 교환(EX -> 익스테리어1 vs 익스테리어 2 플러스)
   */
  @Get('/change')
  async getChangedOptions(
    @Query('modelCode') modelCode: string,
    @Query('optionCode') optionCode: string,
    @Query('beforeOptionCode') beforeOptionCode: string
  ): Promise<ChangedOptions> {
    return await this.optionService.getChangedOptions(modelCode, optionCode, beforeOptionCode)
  }

  /**
   * 모델과 선택된 옵션들 기준으로 tuix들 정보 반환
   */
  @Get('/tuix')
  async getTuixs(
    @Query('modelCode') modelCode: string,
    @Query('beforeOptionCode') beforeOptionCode: string,
    @Query('beforeTuixCode') beforeTuixCode: string
  ): Promise<OptionInfosDto> {
    return await this.optionService.getTuixs(modelCode, beforeOptionCode, beforeTuixCode)
  }

  /**
   * 모델과 선택된 옵션들 기준으로 tuix들 정보 반환
   */
  @Post('/estimation')
  async saveEstimation(@Body() estimationInfo: EstimationInfoCommand): Promise<string> {
    return await this.optionService.saveEstimation(estimationInfo)
  }

  /**
   * 모델과 선택된 옵션들 기준으로 tuix들 정보 반환
   */
  @Get('/estimation')
  async getEstimation(@Query('estimationUrl') estimationUrl: string): Promise<EstimationInfoCommand> {
    return await this.optionService.getEstimation(estimationUrl)
  }
}
