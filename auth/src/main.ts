import {NestFactory} from '@nestjs/core';
import {AppModule} from '@/app.module';
import {INestApplication, VersioningType} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('medley-authentication API')
      .setDescription('The medley-authentication API description')
      .setVersion('1.0')
      .addTag('auth')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  await app.listen(8081);
  console.log(`Application is running on: ${await app.getUrl() === 'http://[::1]:8081' ? 'http://localhost:8081' : await app.getUrl()}/api/v1`);
}

bootstrap();
