import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ColorRepository } from './adapter/repository/color.repository'
import { ColorService } from './application/service/color.service'
import { ColorController } from './adapter/web/color.controller'
import { ModelRepository } from './adapter/repository/model.repository'
import { ModelService } from './application/service/model.service'
import { ModelController } from './adapter/web/model.controller'
import { OptionRepository } from './adapter/repository/option.repository'
import { OptionService } from './application/service/option.service'
import { OptionController } from './adapter/web/option.controller'

@Module({
  controllers: [ModelController, ColorController, OptionController],
  providers: [
    PrismaService,
    ModelService,
    ModelRepository,
    ColorService,
    ColorRepository,
    OptionService,
    OptionRepository
  ],
  exports: [ColorService, OptionService]
})
export class CoreModule {}
