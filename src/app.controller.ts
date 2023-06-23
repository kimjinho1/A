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

  @Get('/option')
  async getOptionsByModelCode(@Query('modelCode') modelCode: string): Promise<any> {
    return await this.appService.getOptionsByModelCode(modelCode)
  }

  @Get('/disable-option')
  async getDisabledOptionsBySelectedOptionCodes(@Query('optionCodes') optionCodes: string): Promise<any> {
    const optionCodeList = optionCodes.split(',')
    return await this.appService.getDisabledOptionsBySelectedOptionCodes(optionCodeList)
  }
}
