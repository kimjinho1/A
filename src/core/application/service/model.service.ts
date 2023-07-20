import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Car, Drive, Engine, Mission } from '@prisma/client'
import { CarInfosDto } from '../../adapter/repository/dto/model/output'
import {
  CarInfo,
  CarTypeWithCarInfosDto,
  ModelFiltersDto,
  ModelInfoDto,
  TrimInfosDto
} from '../../adapter/web/dto/model/out'
import { GetTrimsCommand } from 'src/core/adapter/web/command/get-trims.command'
import { ErrorMessages } from 'src/common/exception/errors'
import { ModelRepository } from 'src/core/adapter/repository/model.repository'

@Injectable()
export class ModelService {
  constructor(private readonly modelRepository: ModelRepository) {}

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
    try {
      const modelFilters = await this.modelRepository.getModelFilters(carCode)
      const result = {
        engines: modelFilters.carEngine.map(x => x.engine),
        missions: modelFilters.carMission.map(x => x.mission),
        drives: modelFilters.carDrive.map(x => x.drive)
      }

      return result
    } catch (error) {
      throw new NotFoundException(ErrorMessages.CAR_NOT_FOUND)
    }
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
    try {
      const modelInfo = await this.modelRepository.getCarModelInfo(modelCode)
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
    } catch (error) {
      throw new NotFoundException(ErrorMessages.MODEL_NOT_FOUND)
    }
  }

  /**
   * UTILS
   */
  extrectCarInfo(carInfo: CarInfosDto): Promise<CarInfo[]> {
    try {
      const carInfos = Promise.all(
        carInfo.car.map(async car => {
          const carLowPrice = await this.modelRepository.getCarLowPrice(car.carId)
          return {
            carCode: car.carCode,
            carName: car.carName,
            carImagePath: car.carImagePath,
            carLowPrice: carLowPrice.modelPrice
          }
        })
      )
      return carInfos
    } catch (error) {
      throw new NotFoundException(ErrorMessages.DATA_SEEDING_NOT_DONE)
    }
  }

  async getCar(carCode: string): Promise<Car> {
    try {
      return await this.modelRepository.getCar(carCode)
    } catch (error) {
      throw new NotFoundException(ErrorMessages.CAR_NOT_FOUND)
    }
  }

  async getEngine(engineCode: string): Promise<Engine> {
    try {
      return await this.modelRepository.getEngine(engineCode)
    } catch (error) {
      throw new NotFoundException(ErrorMessages.ENGINE_NOT_FOUND)
    }
  }

  async getMission(missionCode: string): Promise<Mission> {
    try {
      return await this.modelRepository.getMission(missionCode)
    } catch (error) {
      throw new NotFoundException(ErrorMessages.MISSION_NOT_FOUND)
    }
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
