import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { PrismaService } from './prisma.service'
import { CoreModule } from './core/core.module'

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
  imports: [
    CoreModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'assets')
    })
  ]
})
export class AppModule {}
