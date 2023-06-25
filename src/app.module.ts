import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma.service'
import { ModelModule } from './model/model.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [ModelModule]
})
export class AppModule {}
