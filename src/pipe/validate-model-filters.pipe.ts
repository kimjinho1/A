import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common'
import { ValidatedModelFiltersRequestDto } from 'src/model/dto/request'
import { ModelRepository } from 'src/model/model.repository'

@Injectable()
export class ValidateModelFiltersPipe implements PipeTransform {
  constructor(private modelRepository: ModelRepository) {}

  async transform(
    value: ValidatedModelFiltersRequestDto,
    metadata: ArgumentMetadata
  ): Promise<ValidatedModelFiltersRequestDto> {
    const { carCode, engineCode, missionCode, driveCode } = value

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

    const driveId = await this.getDriveId(car.carCode, driveCode)
    if (driveCode !== '' && !driveId) {
      throw new NotFoundException('존재하지 않는 구동방식 코드입니다.')
    }

    if (driveCode === '' && carCode !== 'CN12') {
      throw new BadRequestException('잘못된 구동 방식 코드입니다.')
    }

    value.carId = car.carId
    value.engineId = engine.engineId
    value.missionId = mission.missionId
    value.driveId = driveId

    return value
  }

  private async getDriveId(carCode: string, driveCode: string): Promise<number | null> {
    if (driveCode === '' && carCode === 'CN12') {
      return null
    }

    if (driveCode === '') {
      return null
    }

    const drive = await this.modelRepository.getDrive(driveCode)

    return drive?.driveId || null
  }
}
