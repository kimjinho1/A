import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ModelModule } from './model/model.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { HexModule } from './hex/hex.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'assets')
    }),
    ModelModule,
    HexModule
  ]
})
export class AppModule {}
