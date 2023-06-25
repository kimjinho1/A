import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common'
import { ValidateModelFiltersPipe } from 'src/pipe/validate-model-filters.pipe'
import { ValidatedModelFiltersRequestDto } from './dto/request'
import { CarInfosResponseDto, ModelFiltersResponseDto, TrimInfosResponseDto } from './dto/response'
import { ModelService } from './model.service'

@Controller('model')
export class ModelController {
  constructor(
    private readonly modelService: ModelService,
    private readonly validateModelFiltersPipe: ValidateModelFiltersPipe
  ) {}

  /*
   * 투싼과 아반떼 차량의 정보(코드, 이름, 차종, 최저가격)를 반환합니다.
   */
  @Get()
  async getCarInfos(): Promise<CarInfosResponseDto[]> {
    return await this.modelService.getCarInfos()
  }

  /*
   * 선택된 차량의 엔진, 변속기, 구동방식 정보(코드, 이름)를 반환합니다.
   */
  @Get('/filters/:carCode')
  async getModelFilters(@Param('carCode') carCode: string): Promise<ModelFiltersResponseDto> {
    return await this.modelService.getModelFilters(carCode)
  }

  /*
   * 선택된 차량과 필터들 기반으로 선택할 수 있는 트림 정보(코드, 이름, 가격)를 반홥합니다
   */
  @Get('/trims')
  @UsePipes(ValidateModelFiltersPipe)
  async getTrims(@Query() modelFilters: ValidatedModelFiltersRequestDto): Promise<TrimInfosResponseDto[]> {
    return await this.modelService.getTrims(modelFilters)
  }
}
