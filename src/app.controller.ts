import { Controller, Get, Param, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  // @Get('/option')
  // async getOptionsByModelCode(@Query('modelCode') modelCode: string): Promise<any> {
  //   return await this.appService.getOptionsByModelCode(modelCode)
  // }

  // @Get('/disable-option')
  // async getDisabledOptionsBySelectedOptionCodes(@Query('optionCodes') optionCodes: string): Promise<any> {
  //   const optionCodeList = optionCodes.split(',')
  //   return await this.appService.getDisabledOptionsBySelectedOptionCodes(optionCodeList)
  // }

  // @Get('/tuix')
  // async getTuixsByOptionCode(@Query('modelCode') modelCode: string): Promise<any> {
  //   return await this.appService.getTuixsByOptionCode(modelCode)
  // }

  // @Get('/add-possible-option')
  // async getAddPosibleTuixBySelectedOptionCode(@Query('optionCodes') optionCodes: string): Promise<any> {
  //   const optionCodeList = optionCodes.split(',')
  //   return await this.appService.getAddPosibleTuixBySelectedOptionCode(optionCodeList)
  // }
}
