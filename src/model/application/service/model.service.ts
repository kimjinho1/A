import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Car } from '@prisma/client'
import { CarInfosDto } from '../port/repository/dto/output'
import { ModelRepositoryPort } from '../port/repository/model-repository.port'
import { ModelFilterCodesDto } from '../port/web/dto/in'
import { CarInfo, CarTypeWithCarInfosDto, ModelFiltersDto, ModelInfoDto, TrimInfosDto } from '../port/web/dto/out'
import { ModelServicePort } from '../port/web/model-service.port'

@Injectable()
export class ModelService implements ModelServicePort {
  constructor(
    @Inject(ModelRepositoryPort)
    private readonly modelRepository: ModelRepositoryPort
  ) {}

  /** 차량 정보 반환 */
  async getCarInfo(carCode: string): Promise<Car> {
    const car = await this.modelRepository.getCar(carCode)
    if (car === null) {
      throw new NotFoundException('존재하지 않는 차량 코드입니다.')
    }

    return car
  }

  /** 투싼과 아반떼 차량의 정보(코드, 이름, 차종, 이미지 경로, 최저가격)를 반환합니다. */
  async getCarInfos(): Promise<CarTypeWithCarInfosDto> {
    const allCarInfo = await this.modelRepository.getCarInfos()
    if (allCarInfo.length === 0) {
      throw new NotFoundException('데이터 시딩이 안된 상태입니다.')
    }

    const result = await Promise.all(
      allCarInfo.map(async carInfo => {
        const carInfos = await this.extrectCarInfo(carInfo)
        return {
          carTypeCode: carInfo.carTypeCode,
          carTypeName: carInfo.carTypeName,
          carInfos
        }
      })
    )

    return result
  }

  /** 선택된 차량의 엔진, 변속기, 구동방식 정보(코드, 이름)를 반환합니다. */
  async getModelFilters(carCode: string): Promise<ModelFiltersDto> {
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

  /** 선택된 차량과 필터들 기반으로 선택할 수 있는 트림 정보(코드, 이름, 이미지 경로, 가격)를 반홥합니다 */
  async getTrims(modelFiltersDto: ModelFilterCodesDto): Promise<TrimInfosDto> {
    const { carCode, engineCode, missionCode, driveCode } = modelFiltersDto

    const car = await this.modelRepository.getCar(carCode)
    if (car === null) {
      throw new NotFoundException('존재하지 않는 차량 코드입니다.')
    }

    const engine = await this.modelRepository.getEngine(engineCode)
    if (engine === null) {
      throw new NotFoundException('존재하지 않는 엔진 코드입니다.')
    }

    const mission = await this.modelRepository.getMission(missionCode)
    if (mission === null) {
      throw new NotFoundException('존재하지 않는 변속기 코드입니다.')
    }

    const drive = await this.modelRepository.getDrive(driveCode)
    const driveId = (driveCode === '' && carCode === 'CN12') || driveCode === '' ? null : drive?.driveId || null
    if (driveCode !== '' && !driveId) {
      throw new NotFoundException('존재하지 않는 구동방식 코드입니다.')
    }
    if (driveCode === '' && carCode !== 'CN12') {
      throw new BadRequestException('잘못된 구동 방식 코드입니다.')
    }

    const modelFilter = {
      carId: car.carId,
      engineId: engine.engineId,
      missionId: mission.missionId,
      driveId
    }

    const trimInfos = await this.modelRepository.getTrims(modelFilter)
    if (trimInfos.length === 0) {
      throw new NotFoundException('필터 정보와 부합하는 트림 정보가 없습니다.')
    }

    const result = trimInfos.map(trimInfo => {
      return {
        modelId: trimInfo.modelId,
        modelCode: trimInfo.modelCode,
        modelImagePath: trimInfo.modelImagePath,
        modelPrice: trimInfo.modelPrice,
        filterSummary: `${engine.engineName}${drive ? ' ' + drive.driveName : ''} ${mission.missionName}`,
        ...trimInfo.trim
      }
    })
    return result
  }

  /** 차량 모델 정보 반환 */
  async getCarModelInfo(modelCode: string): Promise<ModelInfoDto> {
    const modelInfo = await this.modelRepository.getCarModelInfo(modelCode)
    if (modelInfo === null) {
      throw new NotFoundException('존재하지 않는 차량 모델 코드입니다.')
    }

    const result = {
      modelId: modelInfo.modelId,
      modelCode: modelInfo.modelCode,
      modelName: modelInfo.modelName,
      modelPrice: modelInfo.modelPrice,
      ...modelInfo.car,
      ...modelInfo.trim
    }

    return result
  }

  /** Utils */
  extrectCarInfo(carInfo: CarInfosDto): Promise<CarInfo[]> {
    const carInfos = Promise.all(
      carInfo.car.map(async car => {
        const carLowPrice = await this.modelRepository.getCarLowPrice(car.carId)
        if (carLowPrice === null) {
          throw new NotFoundException('데이터 시딩이 안된 상태입니다.')
        }
        return {
          carCode: car.carCode,
          carName: car.carName,
          carImagePath: car.carImagePath,
          carLowPrice: carLowPrice.modelPrice
        }
      })
    )

    return carInfos
  }
}
