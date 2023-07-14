import { Injectable } from '@nestjs/common'
import { CarModel, CarModelOption, Option } from '@prisma/client'
import {
  AddPossibleOptionsDto,
  AutoSelectedColorsDto,
  AutoSelectedOptionsDto,
  DeactivatedOptionsDto,
  DeletedOptionsDto,
  OptionInfosDto
} from 'src/core/application/port/repository/dto/option/out'
import { PrismaService } from 'src/prisma.service'

@Injectable()
// export class ModelRepository implements ModelRepositoryPort {
export class OptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOption(optionCode: string): Promise<Option> {
    return await this.prisma.option.findUniqueOrThrow({
      where: {
        optionCode
      }
    })
  }

  async getOptions(modelId: number): Promise<OptionInfosDto> {
    return await this.prisma.option.findMany({
      where: {
        carModelOption: {
          some: {
            modelId
          }
        }
      },
      include: {
        optionType: true
      }
    })
  }

  async getUnselectableOptionIds(trimId: number, modelId: number): Promise<Pick<Option, 'optionId'>[]> {
    return await this.prisma.option.findMany({
      where: {
        carModelOption: {
          some: {
            modelId
          }
        },
        optionToActivate: {
          some: {
            trimId
          }
        }
      },
      select: {
        optionId: true
      }
    })
  }

  async getCarModelOption(modelId: number, optionId: number): Promise<CarModelOption> {
    return await this.prisma.carModelOption.findFirstOrThrow({
      where: {
        modelId,
        optionId
      }
    })
  }

  async getAddPossibleOptions(optionId: number): Promise<AddPossibleOptionsDto> {
    return await this.prisma.activateOption.findMany({
      where: {
        optionId
      },
      select: {
        optionToActivate: {
          select: {
            optionId: true,
            optionCode: true,
            optionName: true
          }
        }
      }
    })
  }

  async getDeactivatedOptions(optionId: number): Promise<DeactivatedOptionsDto> {
    return await this.prisma.deactivateOption.findMany({
      where: {
        optionId
      },
      select: {
        optionToDeactivate: {
          select: {
            optionId: true,
            optionCode: true,
            optionName: true
          }
        }
      }
    })
  }

  async getDeletedOptions(optionId: number): Promise<DeletedOptionsDto> {
    return await this.prisma.deleteOption.findMany({
      where: {
        optionId
      },
      select: {
        optionToDelete: {
          select: {
            optionId: true,
            optionCode: true,
            optionName: true
          }
        }
      }
    })
  }

  async getAutoSelectedOptions(intColorId: number): Promise<AutoSelectedOptionsDto> {
    return await this.prisma.intColorOption.findMany({
      where: {
        intColorId
      },
      select: {
        option: {
          select: {
            optionId: true,
            optionCode: true,
            optionName: true
          }
        }
      }
    })
  }

  async getAutoSelectedColors(optionId: number): Promise<AutoSelectedColorsDto> {
    return await this.prisma.intColorOption.findMany({
      where: {
        optionId
      },
      select: {
        intColor: {
          select: {
            intColorId: true,
            intColorCode: true,
            intColorName: true
          }
        }
      }
    })
  }
}
