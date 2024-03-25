import {Module} from '@nestjs/common';
import {UserModule} from "./modules/user.module";
import {AuthModule} from "./modules/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        AuthModule,
        UserModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(
        {
            type: 'postgres',
            host: 'localhost',
            port: 5431,
            username: 'medley-auth',
            password: 'medley-auth',
            database: 'medley-db-auth',
            entities: [
                __dirname + '/../entities/*.entity{.ts,.js}',
            ],
            synchronize: true
        })],
})
export class AppModule {
}
