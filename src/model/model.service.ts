import { Injectable, NotFoundException } from '@nestjs/common'
import { ValidatedModelFiltersRequestDto } from './dto/request'
import { CarInfosResponseDto, ModelFiltersResponseDto, TrimInfosResponseDto } from './dto/response'
import { modelRepository } from './model.repository'

@Injectable()
export class ModelService {
  constructor(private readonly modelRepository: modelRepository) {}

  /*
   * 투싼과 아반떼 차량의 정보(코드, 이름, 차종, 최저가격)를 반환합니다.
   */
  async getCarInfos(): Promise<CarInfosResponseDto[]> {
    const cars = await this.modelRepository.getCars()
    if (cars.length === 0) {
      throw new NotFoundException('데이터 시딩이 안된 상태입니다.')
    }

    const result = await Promise.all(
      cars.map(async car => {
        const carType = await this.modelRepository.getCarType(car.carTypeId)
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
  async getModelFilters(carCode: string): Promise<ModelFiltersResponseDto> {
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

  /*
   * 선택된 차량과 필터들 기반으로 선택할 수 있는 트림 정보(코드, 이름, 가격)를 반홥합니다
   */
  async getTrims(vaildatedModelFilters: ValidatedModelFiltersRequestDto): Promise<TrimInfosResponseDto[]> {
    const trimInfos = await this.modelRepository.getTrims(vaildatedModelFilters)
    if (trimInfos.length === 0) {
      throw new NotFoundException('필터 정보와 부합하는 트림 정보가 없습니다.')
    }

    const result = trimInfos.map(trimInfo => {
      return {
        modelId: trimInfo.modelId,
        modelCode: trimInfo.modelCode,
        ...trimInfo.trim,
        modelPrice: trimInfo.modelPrice
      }
    })
    return result
  }
}
