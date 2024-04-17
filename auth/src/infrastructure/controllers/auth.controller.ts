import {Body, Controller, Delete, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from '@domain/services/auth.service';
import {UserLoginDto} from "../dtos/userLogin.dto";
import {UserSignupDto} from "@infrastructure/dtos/userSignup.dto";
import {UserRevocationDto} from "@infrastructure/dtos/userRevocation.dto";
import process from "process";
import {ConfigService} from "@nestjs/config";

@Controller('auth')
export class AuthController {
    constructor(
        private service: AuthService,
        private configService: ConfigService
    ) {
        console.log("AUTH_DB_HOST: ", this.configService.get<string>('AUTH_DB_HOST'))
        console.log("AUTH_DB_PORT: ", this.configService.get<string>('AUTH_DB_PORT'))
        console.log("AUTH_DB_USER: ", this.configService.get<string>('AUTH_DB_USER'))
        console.log("AUTH_DB_PASSWORD: ", this.configService.get<string>('AUTH_DB_PASSWORD'))
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() user: UserLoginDto) {
        return this.service.signIn(user);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signUp(@Body() user: UserSignupDto) {
        await this.service.signUp(user)
        return Promise.resolve();
    }

    @HttpCode(HttpStatus.OK)
    @Delete('revocation')
    revoke(@Body() user: UserRevocationDto) {
        this.service.revoke(user);
        return Promise.resolve();
    }

}
