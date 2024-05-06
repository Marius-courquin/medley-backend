import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import {INestApplication, ValidationPipe, VersioningType} from "@nestjs/common";
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('medley-core API')
    .setDescription('The medley-core API description')
    .setVersion('1.0')
    .addTag('core')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });
  await app.listen(8080);
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
