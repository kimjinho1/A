import { Type } from 'class-transformer'
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator'
import { OPTION_TYPE } from 'src/common/OptionType'

class ModelInfo {
  @IsString()
  @IsNotEmpty()
  code: string

  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsString()
  @IsNotEmpty()
  carName: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsString()
  @IsNotEmpty()
  imagePath: string
}

class ColorInfo {
  @IsString()
  @IsNotEmpty()
  code: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  imagePath: string
}

class OptionInfo {
  @IsString()
  @IsNotEmpty()
  code: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsPositive()
  price: number

  @IsString()
  @IsNotEmpty()
  imagePath: string

  @IsString()
  @IsNotEmpty()
  @IsEnum(OPTION_TYPE)
  typeName: string
}

export class EstimationInfoCommand {
  @IsDefined()
  @ValidateNested()
  @Type(() => ModelInfo)
  modelInfo: ModelInfo

  @IsDefined()
  @ValidateNested()
  @Type(() => ColorInfo)
  intColor: ColorInfo

  @IsDefined()
  @ValidateNested()
  @Type(() => ColorInfo)
  extColor: ColorInfo

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => OptionInfo)
  options: OptionInfo[]
}
