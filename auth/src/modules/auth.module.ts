import {Module} from '@nestjs/common';
import {AuthController} from '@infrastructure/controllers/auth.controller';
import {AuthService} from '@domain/services/auth.service';
import {UserModule} from "./user.module";
import {JwtModule} from "@nestjs/jwt";
import {Hashing} from "@utils/hashing";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: process.env.JWT_KEY,
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        Hashing
    ],
    exports: [AuthService],
})
export class AuthModule {}
