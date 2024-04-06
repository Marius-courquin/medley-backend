import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'medley-core',
      password: 'medley-core',
      database: 'medley-db-core',
      entities: [
        __dirname + '/domain/entities/*.entity{.ts,.js}',
      ],
      synchronize: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
