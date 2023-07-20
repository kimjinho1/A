import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { EstimationInfoCommand } from './command/estimation-info.command'
import { EstimationService } from 'src/core/application/service/estimation.service'

@Controller('estimation')
export class EstimationController {
  constructor(private readonly estimationService: EstimationService) {}

  /**
   * 유저의 차량 견적을 인메모리 캐시에 저장
   */
  @Post()
  async saveEstimation(@Body() estimationInfo: EstimationInfoCommand): Promise<string> {
    return await this.estimationService.saveEstimation(estimationInfo)
  }

  /**
   * 차량 견적을 반환
   */
  @Get()
  async getEstimation(@Query('estimationUrl') estimationUrl: string): Promise<EstimationInfoCommand> {
    return await this.estimationService.getEstimation(estimationUrl)
  }
}
