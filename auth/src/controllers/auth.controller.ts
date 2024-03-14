
import {Body, Controller, Post, HttpCode, HttpStatus, Delete} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {UserDto} from "./user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: UserDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signUp(@Body() signInDto: UserDto) {
        return this.authService.signUp(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('revocation')
    revoke(@Body() signInDto: UserDto) {
        return this.authService.revoke(signInDto.username);
    }

    @HttpCode(HttpStatus.OK)
    @Post('validation')
    validateToken(@Body() body: Record<string, string>) {
        return this.authService.validateToken(body.token);
    }

}
