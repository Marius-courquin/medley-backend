import { Module } from '@nestjs/common';
import { EstateModule } from '@modules/estate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdModule } from '@modules/third.module';
import { ConfigModule } from '@nestjs/config';
import * as process from "process";
import { ElementModule } from "@modules/element.module"
import { FurnishingModule } from "@modules/furnishing.module"
import { StairModule } from "@modules/stair.module"
import { CeilingModule } from "@modules/ceiling.module"
import { GroundModule } from "@modules/ground.module"
import { WallModule } from "@modules/wall.module"
import { WindowModule } from "@modules/window.module"
import { SubElementModule } from "@modules/subElement.module"
import { GenericSubElementModule } from "@modules/genericSubElement.module"
import { WallSocketModule } from "@modules/wallSocket.module"
import { RoomModule } from '@modules/room.module';
import {JwtModule} from "@nestjs/jwt";
import {AgentModule} from "@modules/agent.module";
import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {AuthGuard} from "@infrastructure/guards/auth.guard";
import {AgentInterceptor} from "@infrastructure/interceptors/agent.interceptor";
import {LeaseModule} from "@modules/lease.module";
import {LeaseInspectionModule} from "@modules/leaseInspection.module";
import {FileModule} from "@modules/file.module";
import { LeaseInspectionStepModule } from '@modules/leaseInspectionStep.module';
import { LeaseInspectionStepPictureModule } from '@modules/leaseInspectionStepPicture.module';
import { LeaseInspectionSubStepPictureModule } from '@modules/leaseInspectionSubStepPicture.module';
import { LeaseInspectionSubStepModule } from '@modules/leaseInspectionSubStep.module';
import {EventEmitterModule} from "@nestjs/event-emitter";
import {DiscordNotificationAdapter} from "@infrastructure/adapters/DiscordNotificationAdapter";

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
    SubElementModule,
    WindowModule,
    GenericSubElementModule,
    WallSocketModule,
    AgentModule,
    LeaseModule,
    LeaseInspectionModule,
    LeaseInspectionStepModule,
    LeaseInspectionStepPictureModule,
    LeaseInspectionSubStepModule,
    LeaseInspectionSubStepPictureModule,
    FileModule,
    EventEmitterModule.forRoot(),
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
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async () => ({
          secret: process.env.JWT_KEY,
        }),
        global: true
      })
    }
  ],
  exports: [
      JwtModule,
      DiscordNotificationAdapter
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AgentInterceptor
    },
      DiscordNotificationAdapter
  ]
})
export class AppModule {}