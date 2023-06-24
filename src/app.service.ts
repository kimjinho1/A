import { Injectable } from '@nestjs/common'
import { CarModel, CarType, Drive, Engine, Mission, Prisma, Trim } from '@prisma/client'
import { PrismaService } from './prisma.service'

type CarWithIncludes = Prisma.CarGetPayload<{
  include: {
    carEngine: {
      include: {
        engine: true
      }
    }
    carMission: {
      include: {
        mission: true
      }
    }
    carDrive: {
      include: {
        drive: true
      }
    }
    carTrim: {
      include: {
        trim: true
      }
    }
  }
}>

class a {
  engine: Engine[]
  mission: Mission[]
  drive: Drive[]
  trim: Trim[]
}

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getMenus(): Promise<any> {
    const carList = await this.prisma.car.findMany()
    const data = await Promise.all(
      carList.map(async car => {
        const carType: CarType | null = await this.prisma.carType.findUnique({
          where: {
            carTypeId: car.carTypeId
          }
        })

        if (!carType) {
          throw new Error('carType not found')
        }

        const carModels = await this.prisma.carModel.findMany({
          where: {
            carId: car.carId
          },
          select: {
            modelPrice: true
          },
          orderBy: {
            modelPrice: 'asc'
          },
          take: 1
        })
        return {
          carCode: car.carCode,
          carName: car.carName,
          carTypeName: carType.carTypeName,
          carLowPrice: carModels[0].modelPrice
        }
      })
    )

    return data
  }

  async getModelFilters(carCode: string): Promise<any> {
    const car: CarWithIncludes | null = await this.prisma.car.findUnique({
      where: {
        carCode
      },
      include: {
        carEngine: {
          include: {
            engine: true
          }
        },
        carMission: {
          include: {
            mission: true
          }
        },
        carDrive: {
          include: {
            drive: true
          }
        },
        carTrim: {
          include: {
            trim: true
          }
        }
      }
    })

    if (!car) {
      throw new Error('car not found')
    }

    const result: a = {
      engine: car.carEngine.map(t => t.engine),
      mission: car.carMission.map(t => t.mission),
      drive: car.carDrive.map(t => t.drive),
      trim: car.carTrim.map(t => t.trim)
    }
    return result
  }

  // async getIntColorsByModelCode(modelCode: string) {
  //   // const modelCode = 'NXJJ5DCT2'
  //   // const extColorCode = 'B6S'

  //   const carModel = await this.prisma.carModel.findUnique({
  //     where: { modelCode },
  //     select: {
  //       carId: true,
  //       trimId: true
  //     }
  //   })

  //   if (!carModel) {
  //     throw new Error('CarModel not found')
  //   }

  //   const { carId, trimId } = carModel

  //   const intColors = await this.prisma.carTrimIntColor.findMany({
  //     where: {
  //       carId,
  //       trimId
  //     },
  //     select: {
  //       intColor: true
  //     }
  //   })
  //   return intColors
  // }

  // async getExtColorsByIntColorCode(intColorCode: string) {
  //   const intColor = await this.prisma.intColor.findUnique({
  //     where: {
  //       intColorCode
  //     }
  //   })

  //   if (!intColor) {
  //     throw new Error('intColor not found')
  //   }

  //   const extColors = await this.prisma.intExtColor.findMany({
  //     where: { intColorId: intColor.intColorId },
  //     select: {
  //       extColor: true
  //     }
  //   })

  //   return extColors.map(extColor => extColor.extColor)
  // }

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
