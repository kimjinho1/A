import { Module } from '@nestjs/common'
import { ValidateModelFiltersPipe } from 'src/pipe/validate-model-filters.pipe'
import { PrismaService } from 'src/prisma.service'
import { ModelController } from './model.controller'
import { ModelRepository } from './model.repository'
import { ModelService } from './model.service'

@Module({
  controllers: [ModelController],
  providers: [ModelService, PrismaService, ModelRepository, ValidateModelFiltersPipe]
})
export class ModelModule {}
