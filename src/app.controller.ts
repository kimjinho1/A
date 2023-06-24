import { Controller, Get, Param, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return '내 차 만들기!!'
  }

  // 차량 정보 반환
  @Get('/menus')
  async getMenus(): Promise<any> {
    return await this.appService.getMenus()
  }

  // 차량 모델 선택 필터들 반환
  @Get('/model-filters/:carCode')
  async getModelFilters(@Param('carCode') carCode: string): Promise<any> {
    return await this.appService.getModelFilters(carCode)
  }

  // @Get('/intColor')
  // async getIntColorsByModelCode(@Query('modelCode') modelCode: string): Promise<any> {
  //   return await this.appService.getIntColorsByModelCode(modelCode)
  // }

  // @Get('/extColor')
  // async getExtColorsByIntColorCode(@Query('intColorCode') intColorCode: string): Promise<any> {
  //   return await this.appService.getExtColorsByIntColorCode(intColorCode)
  // }

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
