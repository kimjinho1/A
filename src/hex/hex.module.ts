import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ModelRepository } from './adapter/repository/model.repository'
import { ModelRepositoryPort } from './application/port/repository/model/model-repository.port'

@Module({
  // controllers: [ModelController],
  providers: [
    {
      // provice에서 ModelRepositoryPort 인식을 못하는 문제가 있었음
      // -> 아래 코드 추가하면 해결(Symbol을 사용해서 고유한 식별자를 생성함)
      // export const ModelRepositoryPort = Symbol('ModelRepositoryPort')
      provide: ModelRepositoryPort,
      useClass: ModelRepository
    },
    // {
    //   provide: RedirectsPort,
    //   useClass: ModelService
    // },
    PrismaService
  ]
})
export class HexModule {}
