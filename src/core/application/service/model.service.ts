import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Car, Drive, Engine, Mission } from '@prisma/client'
import { CarInfosDto } from '../port/repository/dto/model/output'
import { ModelRepositoryPort } from '../port/repository/model-repository.port'
import { CarInfo, CarTypeWithCarInfosDto, ModelFiltersDto, ModelInfoDto, TrimInfosDto } from '../port/web/dto/model/out'
import { ModelServicePort } from '../port/web/model-service.port'
import { GetTrimsCommand } from 'src/core/adapter/web/command/get-trims.command'
import { ErrorMessages } from 'src/common/exception/errors'

@Injectable()
export class ModelService implements ModelServicePort {
  constructor(
    @Inject(ModelRepositoryPort)
    private readonly modelRepository: ModelRepositoryPort
  ) {}

  /** 차량 정보 반환 */
  async getCarInfo(carCode: string): Promise<Car> {
    return await this.getCar(carCode)
  }

  /** 투싼과 아반떼 차량의 정보(코드, 이름, 차종, 이미지 경로, 최저가격)를 반환합니다. */
  async getCarInfos(): Promise<CarTypeWithCarInfosDto> {
    const allCarInfo = await this.modelRepository.getCarInfos()
    if (allCarInfo.length === 0) {
      throw new NotFoundException(ErrorMessages.DATA_SEEDING_NOT_DONE)
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
      throw new NotFoundException(ErrorMessages.CAR_NOT_FOUND)
    }

    const result = {
      engines: modelFilters.carEngine.map(x => x.engine),
      missions: modelFilters.carMission.map(x => x.mission),
      drives: modelFilters.carDrive.map(x => x.drive)
    }

    return result
  }

  /** 선택된 차량과 필터들 기반으로 선택할 수 있는 트림 정보(코드, 이름, 이미지 경로, 가격)를 반홥합니다 */
  async getTrims(modelFiltersDto: GetTrimsCommand): Promise<TrimInfosDto> {
    const { carCode, engineCode, missionCode, driveCode } = modelFiltersDto
    const car = await this.getCar(carCode)
    const engine = await this.getEngine(engineCode)
    const mission = await this.getMission(missionCode)
    const drive = await this.modelRepository.getDrive(driveCode)
    const driveId = this.getAndCheckDriveId(drive, driveCode, carCode)

    const trimInfos = await this.modelRepository.getTrims(car.carId, engine.engineId, mission.missionId, driveId)
    if (trimInfos.length === 0) {
      throw new NotFoundException(ErrorMessages.NO_MATCHING_TRIM)
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
      throw new NotFoundException(ErrorMessages.MODEL_NOT_FOUND)
    }

    const result = {
      modelId: modelInfo.modelId,
      modelCode: modelInfo.modelCode,
      modelName: modelInfo.modelName,
      modelPrice: modelInfo.modelPrice,
      modelImagePath: modelInfo.modelImagePath,
      ...modelInfo.car,
      ...modelInfo.trim
    }
    return result
  }

  /**
   * UTILS
   */
  extrectCarInfo(carInfo: CarInfosDto): Promise<CarInfo[]> {
    const carInfos = Promise.all(
      carInfo.car.map(async car => {
        const carLowPrice = await this.modelRepository.getCarLowPrice(car.carId)
        if (carLowPrice === null) {
          throw new NotFoundException(ErrorMessages.DATA_SEEDING_NOT_DONE)
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

  async getCar(carCode: string): Promise<Car> {
    const car = await this.modelRepository.getCar(carCode)
    if (car === null) {
      throw new NotFoundException(ErrorMessages.CAR_NOT_FOUND)
    }
    return car
  }

  async getEngine(engineCode: string): Promise<Engine> {
    const engine = await this.modelRepository.getEngine(engineCode)
    if (engine === null) {
      throw new NotFoundException(ErrorMessages.ENGINE_NOT_FOUND)
    }
    return engine
  }

  async getMission(missionCode: string): Promise<Mission> {
    const mission = await this.modelRepository.getMission(missionCode)
    if (mission === null) {
      throw new NotFoundException(ErrorMessages.MISSION_NOT_FOUND)
    }
    return mission
  }

  getAndCheckDriveId(drive: Drive | null, driveCode: string, carCode: string): number | null {
    const driveId = (driveCode === '' && carCode === 'CN12') || driveCode === '' ? null : drive?.driveId || null
    if (driveCode !== '' && !driveId) {
      throw new NotFoundException(ErrorMessages.DRIVE_NOT_FOUND)
    }
    if (driveCode === '' && carCode !== 'CN12') {
      throw new BadRequestException(ErrorMessages.INVALID_DRIVE_CODE)
    }
    return driveId
  }
}
