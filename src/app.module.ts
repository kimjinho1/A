import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ModelModule } from './model/model.module'
import { join } from 'path'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ModelModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'assets')
    })
  ]
})
export class AppModule {}
