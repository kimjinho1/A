import { Injectable, NotFoundException } from '@nestjs/common'
import { Car, CarType, Drive, Engine, Mission, Prisma } from '@prisma/client'
import CarInfos from '../dto/response/car-info-response.dto'
import { modelRepository } from './model.repository'

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
  }
}>

class a {
  engines: Engine[]
  missions: Mission[]
  drives: Drive[]
}

@Injectable()
export class ModelService {
  constructor(private readonly modelRepository: modelRepository) {}

  /*
   * 투싼과 아반떼 차량의 정보(코드, 이름, 차종, 최저가격)를 반환합니다.
   */
  async getCarInfos(): Promise<CarInfos[]> {
    const cars = await this.modelRepository.findCars()
    if (cars.length === 0) {
      throw new NotFoundException('데이터 시딩이 안된 상태입니다.')
    }

    const res = await Promise.all(
      cars.map(async car => {
        const carType: CarType | null = await this.modelRepository.findCarType(car.carTypeId)
        if (carType === null) {
          throw new NotFoundException('데이터 시딩이 안된 상태입니다.')
        }

        const carLowPrice = await this.modelRepository.getCarLowPrice(car.carId)
        if (carLowPrice === null) {
          throw new NotFoundException('데이터 시딩이 안된 상태입니다.')
        }

        return {
          carCode: car.carCode,
          carName: car.carName,
          carTypeName: carType.carTypeName,
          carLowPrice: carLowPrice.modelPrice
        }
      })
    )

    return res
  }

  async getModelFilters(carCode: string): Promise<any> {
    return null
    // const car: CarWithIncludes | null = await this.prisma.car.findUnique({
    //   where: {
    //     carCode
    //   },
    //   include: {
    //     carEngine: {
    //       include: {
    //         engine: true
    //       }
    //     },
    //     carMission: {
    //       include: {
    //         mission: true
    //       }
    //     },
    //     carDrive: {
    //       include: {
    //         drive: true
    //       }
    //     }
    //   }
    // })
    // if (!car) {
    //   throw new Error('car not found')
    // }
    // const result: a = {
    //   engines: car.carEngine.map(t => t.engine),
    //   missions: car.carMission.map(t => t.mission),
    //   drives: car.carDrive.map(t => t.drive)
    // }
    // return result
  }

  //   async getTrims(carCode: string, engineCode: string, missionCode: string, driveCode: string): Promise<any> {
  //     const car = await this.prisma.car.findUnique({
  //       where: {
  //         carCode
  //       },
  //       select: {
  //         carModel: {
  //           select: {
  //             modelId: true,
  //             modelCode: true,
  //             modelName: true,
  //             modelPrice: true
  //           }
  //         }
  //       }
  //     })

  //     if (!car) {
  //       throw new Error('car not found')
  //     }

  //     return car.carModel
  //     // const result: a = {
  //     //   engines: car.carEngine.map(t => t.engine),
  //     //   missions: car.carMission.map(t => t.mission),
  //     //   drives: car.carDrive.map(t => t.drive)
  //     // }
  //     // return result
  //   }
}
