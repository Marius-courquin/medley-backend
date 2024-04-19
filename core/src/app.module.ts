import { Module } from '@nestjs/common';
import { EstateModule } from './modules/estate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdModule } from './modules/third.module';
import { ConfigModule } from '@nestjs/config';
import * as process from "process";


@Module({
  imports: [
    EstateModule,
    ThirdModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.CORE_DB_HOST,
      port: parseInt(process.env.CORE_DB_PORT) || 5432,
      username: process.env.CORE_DB_USER,
      password: process.env.CORE_DB_PASSWORD,
      database: process.env.CORE_DB_NAME,
      entities: [
        __dirname + '/domain/entities/*.entity{.ts,.js}',
      ],
      synchronize: true
    }),
  ]
})
export class AppModule {}