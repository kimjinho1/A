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
  async getIntColorsByModelCode(@Query('modelCode') modelCode: string): Promise<any> {
    return await this.appService.getIntColorsByModelCode(modelCode)
  }

  @Get('/extColor')
  async getExtColorsByIntColorCode(@Query('intColorCode') intColorCode: string): Promise<any> {
    return await this.appService.getExtColorsByIntColorCode(intColorCode)
  }
}
