import {Module} from '@nestjs/common';
import {AuthController} from '../controllers/auth.controller';
import {AuthService} from '../services/auth.service';
import {UserModule} from "./user.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../constants/auth.constants";

@Module({
    imports: [UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1d'},
        })],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {
}
