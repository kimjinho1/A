import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { CoreModule } from './core/core.module'

@Module({
  imports: [
    CoreModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'assets')
    })
  ]
})
export class AppModule {}
