import { Injectable } from '@nestjs/common'
import { CarModelOption, IntColorOption, Option, OptionType } from '@prisma/client'
import { OPTION_TYPE } from 'src/common/OptionType'
import {
  AddPossibleOptionsDto,
  AddTogetherOptionsDto,
  AutoSelectedColorsDto,
  DeactivatedOptionsDto,
  DeleteReplacementOptionsDto,
  DeletedOptionsDto,
  OptionInfosDto
} from 'src/core/adapter/repository/dto/option/out'
import { PrismaService } from 'src/prisma.service'

@Injectable()
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

  async getTuixs(modelId: number): Promise<OptionInfosDto> {
    return await this.prisma.option.findMany({
      where: {
        AND: [
          {
            carModelOption: {
              some: {
                modelId
              }
            }
          },
          {
            optionType: {
              OR: [{ optionTypeName: OPTION_TYPE.HGA }, { optionTypeName: OPTION_TYPE.PERFORMANCE }]
            }
          }
        ]
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

  async getDetailOption(optionId: number): Promise<Option> {
    return await this.prisma.option.findFirstOrThrow({
      where: {
        optionId,
        optionType: {
          optionTypeName: OPTION_TYPE.DETAIL
        }
      }
    })
  }

  async getTuixOption(optionId: number): Promise<Option> {
    return await this.prisma.option.findFirstOrThrow({
      where: {
        optionId,
        optionType: {
          OR: [{ optionTypeName: OPTION_TYPE.HGA }, { optionTypeName: OPTION_TYPE.PERFORMANCE }]
        }
      }
    })
  }

  async getAddPossibleOptions(optionId: number): Promise<AddPossibleOptionsDto> {
    return await this.prisma.activateOption.findMany({
      where: {
        optionId
      },
      include: {
        optionToActivate: {
          include: {
            optionType: true
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
      include: {
        optionToDeactivate: {
          include: {
            optionType: true
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
      include: {
        optionToDelete: {
          include: {
            optionType: true
          }
        }
      }
    })
  }

  async getAutoSelectedOptions(modelId: number, intColorId: number): Promise<(Option & { optionType: OptionType })[]> {
    return await this.prisma.option.findMany({
      where: {
        intColorOption: {
          some: {
            intColorId
          }
        },
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

  async getIntColorOption(modelId: number): Promise<(Option & { intColorOption: IntColorOption[] })[]> {
    return await this.prisma.option.findMany({
      where: {
        AND: [
          {
            carModelOption: {
              some: {
                modelId: modelId
              }
            }
          },
          {
            intColorOption: {
              some: {}
            }
          }
        ]
      },
      include: {
        intColorOption: true
      }
    })
  }

  async getAddTogetherOptions(modelId: number, optionId: number): Promise<AddTogetherOptionsDto> {
    return await this.prisma.activateOption.findMany({
      where: {
        AND: [
          { activateOptionId: optionId },
          {
            selectedOptionForActivation: {
              carModelOption: {
                some: {
                  modelId
                }
              }
            }
          }
        ]
      },
      include: {
        selectedOptionForActivation: {
          include: {
            optionType: true
          }
        }
      }
    })
  }

  async getDeleteReplacementOptions(modelId: number, optionId: number): Promise<DeleteReplacementOptionsDto> {
    return await this.prisma.deactivateOption.findMany({
      where: {
        AND: [
          { deactivateOptionId: optionId },
          {
            selectedOptionForDeactivation: {
              carModelOption: {
                some: {
                  modelId
                }
              }
            }
          }
        ]
      },
      include: {
        selectedOptionForDeactivation: {
          include: {
            optionType: true
          }
        }
      }
    })
  }
}
