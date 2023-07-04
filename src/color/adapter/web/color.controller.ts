import { Controller, Get, Inject, Query } from '@nestjs/common'
import { ColorServicePort } from 'src/color/application/port/web/color-serivce.port'
import { IntColorInfos } from 'src/color/application/port/web/dto/out'

@Controller('color')
export class ColorController {
  constructor(@Inject(ColorServicePort) private readonly colorService: ColorServicePort) {}

  @Get()
  getHello(): string {
    return 'hello'
  }

  /** 차량 정보 반환 */
  @Get('/int-color')
  async getIntColorInfos(@Query('modelCode') modelCode: string): Promise<IntColorInfos> {
    return await this.colorService.getIntColorInfos(modelCode)
  }
}
