import { Injectable, NotFoundException } from '@nestjs/common'
import CarInfos from './dto/response/car-info-response.dto'
import ModelFilters from './dto/response/model-filters-response.dto'
import { modelRepository } from './model.repository'

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

    const result = await Promise.all(
      cars.map(async car => {
        const carType = await this.modelRepository.findCarType(car.carTypeId)
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

    return result
  }

  /*
   * 선택된 차량의 엔진, 변속기, 구동방식 정보(코드, 이름)를 반환합니다.
   */
  async getModelFilters(carCode: string): Promise<ModelFilters> {
    const modelFilters = await this.modelRepository.getModelFilters(carCode)
    if (!modelFilters) {
      throw new NotFoundException('존재하지 않는 차량 코드입니다.')
    }

    const result = {
      engines: modelFilters.carEngine.map(x => x.engine),
      missions: modelFilters.carMission.map(x => x.mission),
      drives: modelFilters.carDrive.map(x => x.drive)
    }

    return result
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
