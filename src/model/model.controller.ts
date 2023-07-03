import { Car } from '@prisma/client'
import { Controller, Get, Param, Query } from '@nestjs/common'
import { ModelFiltersRequestDto } from './dto/request'
import {
  CarTypeWithCarInfosResponseDto,
  ModelFiltersResponseDto,
  ModelInfoResponseDto,
  TrimInfosResponseDto
} from './dto/response'
import { ModelService } from './model.service'

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  /*
   * 차량 정보를 반환합니다.
   */
  @Get('carInfo/:carCode')
  async getCarInfo(@Param('carCode') carCode: string): Promise<Car> {
    return await this.modelService.getCarInfo(carCode)
  }

  /*
   * 투싼과 아반떼 차량의 정보(코드, 이름, 차종, 이미지 경로, 최저가격)를 반환합니다.
   */
  @Get('carInfos')
  async getCarInfos(): Promise<CarTypeWithCarInfosResponseDto[]> {
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
   * 선택된 차량과 필터들 기반으로 선택할 수 있는 트림 정보(코드, 이름, 이미지 경로, 가격)를 반홥합니다
   */
  @Get('/trims')
  async getTrims(@Query() modelFiltersDto: ModelFiltersRequestDto): Promise<TrimInfosResponseDto[]> {
    return await this.modelService.getTrims(modelFiltersDto)
  }

  /*
   * 차량 모델 정보 반환
   */
  @Get('modelInfo/:modelCode')
  async getModelInfo(@Param('modelCode') modelCode: string): Promise<ModelInfoResponseDto> {
    return await this.modelService.getCarModelInfo(modelCode)
  }
}
