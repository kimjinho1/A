import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ModelController } from './model.controller'
import { modelRepository } from './model.repository'
import { ModelService } from './model.service'

@Module({
  controllers: [ModelController],
  providers: [ModelService, PrismaService, modelRepository]
})
export class ModelModule {}
