import {Module} from '@nestjs/common';
import {AuthController} from '@infrastructure/controllers/auth.controller';
import {AuthService} from '@domain/services/auth.service';
import {UserModule} from "./user.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "@infrastructure/constants/auth.constants";
import {Hashing} from "@utils/hashing";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1d'},
        })],
    controllers: [AuthController],
    providers: [
        AuthService,
        Hashing
    ],
    exports: [AuthService],
})
export class AuthModule {
}
