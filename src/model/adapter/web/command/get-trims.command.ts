import { IsNotEmpty, IsString } from 'class-validator'

export class GetTrimsCommand {
  @IsString()
  @IsNotEmpty()
  carCode: string

  @IsString()
  @IsNotEmpty()
  engineCode: string

  @IsString()
  @IsNotEmpty()
  missionCode: string

  @IsString()
  driveCode: string
}
