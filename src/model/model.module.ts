import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ModelRepositoryPort } from './application/port/repository/model-repository.port'
import { ModelRepository } from './adapter/repository/model.repository'
import { ModelServicePort } from './application/port/web/model-service.port'
import { ModelService } from './application/service/model.service'
import { ModelController } from './adapter/web/model.controller'

@Module({
  controllers: [ModelController],
  providers: [
    {
      /*  provide에서 ModelRepositoryPort 인식을 못하는 문제가 있었다.
       ** 포트 인터페이스에 아래 코드를 추가하면 해결된다.
       ** export const ModelRepositoryPort = Symbol('ModelRepositoryPort')
       ** -> Symbol을 사용해서 고유한 식별자를 생성 */
      provide: ModelRepositoryPort,
      useClass: ModelRepository
    },
    {
      /*  이번엔 ModelService의 생성자에서 ModelRepositoryPort을 인식 못하는 문제가 있었다.
       ** 생성자의 ModelRepositoryPort 부분에 아래 코드를 추가하면 해결된다.
       ** @Inject(ModelRepositoryPort)
       ** -> 의존성 주입! */
      provide: ModelServicePort,
      useClass: ModelService
    },
    PrismaService
  ]
})
export class ModelModule {}
