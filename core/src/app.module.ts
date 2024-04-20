import { Module } from '@nestjs/common';
import { EstateModule } from '@modules/estate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdModule } from '@modules/third.module';
import { ConfigModule } from '@nestjs/config';
import * as process from "process";
import {JwtModule} from "@nestjs/jwt";
import {AgentModule} from "@modules/agent.module";
import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {AuthGuard} from "@infrastructure/guards/auth.guard";
import {AgentInterceptor} from "@infrastructure/interceptors/agent.interceptor";


@Module({
  imports: [
    EstateModule,
    ThirdModule,
    AgentModule,
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
      JwtModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AgentInterceptor
    }
  ]
})
export class AppModule {}