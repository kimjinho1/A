import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ModelRepositoryPort } from './application/port/repository/model-repository.port'
import { ModelRepository } from './adapter/repository/model.repository'
import { ModelServicePort } from './application/port/web/model-service.port'
import { ModelService } from './application/service/model.service'

@Module({
  // controllers: [ModelController],
  providers: [
    {
      /*  provide에서 ModelRepositoryPort 인식을 못하는 문제가 있었다.
       ** 포트 인터페이스에 아래 코드를 추가하면 해결된다.
       ** -> Symbol을 사용해서 고유한 식별자를 생성
       ** export const ModelRepositoryPort = Symbol('ModelRepositoryPort') */
      provide: ModelRepositoryPort,
      useClass: ModelRepository
    },
    {
      /*  이번엔 ModelServicePort가 ModelRepositoryPort을 주입 받지 못해서 생긴 문제가 있었다.
       ** 생성자의 ModelRepositoryPort 부분에 아래 코드를 추가하면 해결된다.
       ** -> 의존성 주입!
       ** @Inject(ModelRepositoryPort) */
      provide: ModelServicePort,
      useClass: ModelService
    },
    PrismaService
  ]
})
export class HexModule {}
