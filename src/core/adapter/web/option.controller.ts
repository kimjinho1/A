import { Controller, Get, Inject, Query } from '@nestjs/common'
import { OptionInfosDto } from 'src/core/application/port/web/dto/option/out'
import { OptionService } from 'src/core/application/service/option.service'

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
   * 같이 상태가 바뀌어야 하는 종속성 있는 옵션들 반환
   * 같이 선택(EX -> 컨비니언스1 & 인포테이먼트 내비)
   * 교환(EX -> 익스테리어1 vs 익스테리어 2 플러스)
   */
  @Get('/add-together')
  async getAddTogetherOptions(
    @Query('modelCode') modelCode: string,
    @Query('optionCode') optionCode: string
  ): Promise<OptionInfosDto> {
    console.log(optionCode)
    return await this.optionService.getAddTogetherOptions(modelCode, optionCode)
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
   * 특정 옵션(세이지 그린 인테리어 컬러)이 선택되면 자동으로 선택되어야 하는 색상들 반환
   */
  // @Get('/auto-choice-color')
  // async getAutoSelectedColors(
  //   @Query('modelCode') modelCode: string,
  //   @Query('optionCode') optionCode: string
  // ): Promise<ColorsDto> {
  //   return await this.optionService.getAutoSelectedColors(modelCode, optionCode)
  // }
}
