import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ResponseWrapperInterceptor } from './common/interceptor/response-wrapper.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // cors
  app.enableCors()
  // 인터셉터
  app.useGlobalInterceptors(new ResponseWrapperInterceptor())
  // 파이프
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  // 스웨거
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)

  await app.listen(3000)
}
bootstrap()
