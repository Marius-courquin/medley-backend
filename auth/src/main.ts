import {NestFactory} from '@nestjs/core';
import {AppModule} from '@/app.module';
import {INestApplication, ValidationPipe, VersioningType} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('medley-authentication API')
      .setDescription('The medley-authentication API description')
      .setVersion('1.0')
      .setBasePath('api/v1')
      .addServer('http://localhost:8081/api/v1', 'Local server')
      .addServer('https://medley-auth.m-w-s.fr/api/v1', 'Production server')
      .addBearerAuth()
      .addGlobalParameters({
            name: 'Authorization',
            in: 'header',
            required: true,
            description: 'Bearer token',
            })
      .setExternalDoc('Posman collection', '/api-json')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  await app.listen(8081);
  console.log(`Application is running on: ${await app.getUrl() === 'http://[::1]:8081' ? 'http://localhost:8081' : await app.getUrl()}/api/v1`);
}

bootstrap();
