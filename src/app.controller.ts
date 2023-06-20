import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/menu')
  async getMenu(): Promise<any> {
    return await this.appService.getMenu()
  }

  @Get('/intColor')
  async getIntColors(@Query('modelCode') modelCode: string, @Query('extColorCode') extColorCode: string): Promise<any> {
    return await this.appService.getIntColors(modelCode, extColorCode)
  }
}
