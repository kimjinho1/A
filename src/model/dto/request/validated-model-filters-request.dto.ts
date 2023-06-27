import { ModelFiltersRequestDto } from './model-filters-request.dto'

export class ValidatedModelFiltersRequestDto extends ModelFiltersRequestDto {
  modelImagePath: string

  carId: number

  engineId: number

  missionId: number

  driveId: number | null
}
