import { Injectable, NotFoundException } from '@nestjs/common'
import { CarModel, CarType, Drive, Engine, ExtColor, IntColor, Mission, Prisma, Trim } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return '내차만들기!!'
  }

  async getExtColorsByIntColorCode(intColorCode: string): Promise<ExtColor[]> {
    const intColor = await this.prisma.intColor.findFirst({
      where: {
        intColorCode
      }
    })
    if (!intColor) {
      throw new Error('intColor not found')
    }

    const extColors = await this.prisma.intExtColor.findMany({
      where: { intColorId: intColor.intColorId },
      select: {
        extColor: true
      }
    })

    const result = extColors.map(extColor => extColor.extColor)
    return result
  }

  // async getOptionsByModelCode(modelCode: string) {
  //   const carModel = await this.prisma.carModel.findUnique({
  //     where: {
  //       modelCode
  //     }
  //   })
  //   if (!carModel) {
  //     throw new Error('carModel not found')
  //   }
  //   const options = await this.prisma.carModelOption.findMany({
  //     where: { modelId: carModel.modelId },
  //     select: {
  //       option: true
  //     }
  //   })
  //   return options.map(option => option.option)
  // }
  // async getDisabledOptionsBySelectedOptionCodes(optionCodes: string[]) {
  //   const data: any = []
  //   await Promise.all(
  //     optionCodes.map(async optionCode => {
  //       const option = await this.prisma.option.findUnique({
  //         where: {
  //           optionCode
  //         }
  //       })
  //       if (!option) {
  //         throw new Error('option not found')
  //       }
  //       const disabledOptions = await this.prisma.disabledOption.findMany({
  //         where: {
  //           optionId: option.optionId
  //         },
  //         select: {
  //           disabledOption: true
  //         }
  //       })
  //       disabledOptions.map(disabledOption => {
  //         data.push(disabledOption.disabledOption)
  //       })
  //     })
  //   )
  //   return data
  // }
  // async getTuixsByOptionCode(modelCode: string) {
  //   const carModel = await this.prisma.carModel.findUnique({
  //     where: {
  //       modelCode
  //     }
  //   })
  //   if (!carModel) {
  //     throw new Error('carModel not found')
  //   }
  //   const tuixs = await this.prisma.carModelTuix.findMany({
  //     where: { modelId: carModel.modelId },
  //     select: {
  //       tuix: true
  //     }
  //   })
  //   return tuixs.map(tuix => tuix.tuix)
  // }
  // async getAddPosibleTuixBySelectedOptionCode(optionCodes: string[]) {
  //   const data: any = []
  //   await Promise.all(
  //     optionCodes.map(async optionCode => {
  //       const option = await this.prisma.option.findUnique({
  //         where: {
  //           optionCode
  //         }
  //       })
  //       if (!option) {
  //         throw new Error('option not found')
  //       }
  //       const tuixRequiredOptions = await this.prisma.tuixRequiredOption.findMany({
  //         where: {
  //           optionId: option.optionId
  //         },
  //         select: {
  //           tuix: true
  //         }
  //       })
  //       tuixRequiredOptions.map(tuixRequiredOption => {
  //         data.push(tuixRequiredOption.tuix)
  //       })
  //     })
  //   )
  //   return data
  // }
}
