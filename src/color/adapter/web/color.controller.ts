import { Controller, Get, Inject, Query } from '@nestjs/common'
import { IntColor } from '@prisma/client'
import { ColorServicePort } from 'src/color/application/port/web/color-serivce.port'

@Controller('color')
export class ColorController {
  constructor(@Inject(ColorServicePort) private readonly colorService: ColorServicePort) {}

  @Get()
  getHello(): string {
    return 'hello'
  }

  /** 차량 정보 반환 */
  @Get('/int-color')
  async getIntColorsByModelCode(@Query('modelCode') modelCode: string): Promise<IntColor[]> {
    return await this.colorService.getIntColorsByModelCode(modelCode)
  }
}
