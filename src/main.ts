import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResponseWrapperInterceptor } from './common/interceptor/response-wrapper.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // cors
  app.enableCors()
  // 인터셉터
  app.useGlobalInterceptors(new ResponseWrapperInterceptor())
  // 파이프
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  await app.listen(3000)
}
bootstrap()
