import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder} from '@nestjs/swagger/dist/document-builder';
import {INestApplication, ValidationPipe, VersioningType} from "@nestjs/common";
import {SwaggerModule} from '@nestjs/swagger/dist/swagger-module';
import {AllExceptionsFilter} from "@infrastructure/filters/AllExceptionsFilter";
import {DiscordNotificationAdapter} from "@infrastructure/adapters/DiscordNotificationAdapter";

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('medley-core API')
        .setDescription('The medley-core API description')
        .setVersion('1.0')
        .setBasePath('api/v1')
        .addServer('http://localhost:8080', 'Local server')
        .addServer('https://medley-core.m-w-s.fr', 'Production server')
        .addGlobalParameters({
            name: 'Authorization',
            in: 'header',
            required: true,
            description: 'Bearer token',
        })
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe());

    const notificationService = app.get(DiscordNotificationAdapter);

    app.useGlobalFilters(new AllExceptionsFilter(notificationService));

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: ['1'],
    });
    await app.listen(8080);
    console.log(`Application is running on: ${await app.getUrl() === 'http://[::1]:8080' ? 'http://localhost:8080' : await app.getUrl()}/api/v1`);
}

bootstrap();
