import { Module } from '@nestjs/common';
import { EstateModule } from './modules/estate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdModule } from './modules/third.module';
import { ConfigModule } from '@nestjs/config';
import * as process from "process";
import { RoomModule } from './modules/room.module';
import { ElementModule } from "@modules/element.module"
import { FurnishingModule } from "@modules/furnishing.module"
import { StairModule } from "@modules/stair.module"
import { CeilingModule } from "@modules/ceiling.module"
import { GroundModule } from "@modules/ground.module"
import { WallModule } from "@modules/wall.module"



@Module({
  imports: [
    EstateModule,
    ThirdModule,
    RoomModule,
    ElementModule,
    FurnishingModule,
    StairModule,
    CeilingModule,
    GroundModule,
    WallModule,
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