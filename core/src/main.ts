import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('medley-core API')
  .setDescription('The medley-authentication API description')
  .setVersion('1.0')
  .addTag('core')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
