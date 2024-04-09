import {Module} from '@nestjs/common';
import {UserModule} from "@modules/user.module";
import {AuthModule} from "@modules/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";

@Module({
    imports: [
        AuthModule,
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(
        {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT) || 5431,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [
                __dirname + '/domain/entities/*.entity{.ts,.js}',
            ],
            synchronize: true
        })],
})
export class AppModule {
}
