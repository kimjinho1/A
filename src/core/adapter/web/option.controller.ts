import { Controller, Get, Inject, Query } from '@nestjs/common'
import { AddPossibleOptionsDto, OptionInfosDto } from 'src/core/application/port/web/dto/option/out'
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
  ): Promise<AddPossibleOptionsDto> {
    return await this.optionService.getAddPossibleOptions(modelCode, optionCode)
  }
}
