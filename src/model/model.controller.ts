import { Controller, Get, Param, Query } from '@nestjs/common'
import CarInfos from './dto/response/car-info-response.dto'
import { ModelService } from './model.service'

@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  /*
   * 투싼과 아반떼 차량의 정보(코드, 이름, 차종, 최저가격)를 반환합니다.
   */
  @Get()
  async getCarInfos(): Promise<CarInfos[]> {
    return await this.modelService.getCarInfos()
  }

  /*
   * 선택된 차량의 엔진, 변속기, 구동방식 정보(코드, 이름)를 반환합니다.
   */
  @Get('/filters/:carCode')
  async getModelFilters(@Param('carCode') carCode: string): Promise<any> {
    return await this.modelService.getModelFilters(carCode)
  }

  //   // 선택 가능한 트림들 반환
  //   @Get('/trims/:carCode')
  //   async getTrims(
  //     @Param('carCode') carCode: string,
  //     @Query('engineCode') engineCode: string,
  //     @Query('missionCode') missionCode: string,
  //     @Query('driveCode') driveCode: string
  //   ): Promise<any> {
  //     return await this.modelService.getTrims(carCode, engineCode, missionCode, driveCode)
  //   }
}
