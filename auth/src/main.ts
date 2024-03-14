import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('medley-authentication API')
      .setDescription('The medley-authentication API description')
      .setVersion('1.0')
      .addTag('test')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8081);
}

bootstrap();
