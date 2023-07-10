import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ColorRepositoryPort } from './application/port/repository/color-repository.port'
import { ColorRepository } from './adapter/repository/color.repository'
import { ColorServicePort } from './application/port/web/color-serivce.port'
import { ColorService } from './application/service/color.service'
import { ColorController } from './adapter/web/color.controller'

@Module({
  controllers: [ColorController],
  providers: [
    // {
    //   provide: ColorRepositoryPort,
    //   useClass: ColorRepository
    // },
    // {
    //   provide: ColorServicePort,
    //   useClass: ColorService
    // },
    PrismaService,
    ColorRepository,
    ColorService
  ]
})
export class ColorModule {}
