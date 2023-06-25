import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ModelModule } from './model/model.module'
import { PrismaService } from './prisma.service'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ModelModule]
})
export class AppModule {}
