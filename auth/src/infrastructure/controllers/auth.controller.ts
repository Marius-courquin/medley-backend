import {Body, Controller, Delete, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from '@domain/services/auth.service';
import {UserLoginDto} from "../dtos/userLogin.dto";
import {UserSignupDto} from "@infrastructure/dtos/userSignup.dto";
import {UserRevocationDto} from "@infrastructure/dtos/userRevocation.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private service: AuthService,
    ) {}

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

    @HttpCode(HttpStatus.OK)
    @Post('validation')
    async validateToken(@Body() body: Record<string, string>) {
        return this.service.validateToken(body.token);
    }

}
