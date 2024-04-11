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
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        __dirname + '/domain/entities/*.entity{.ts,.js}',
      ],
      synchronize: true
    }),
  ]
})
export class AppModule {}

console.log('process env val', process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME)