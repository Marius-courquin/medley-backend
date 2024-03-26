import {Body, Controller, Delete, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from '../domain/services/auth.service';
import {UserDto} from "./dtos/user.dto";
import {UserDtoMapper} from "./mappers/user.dto.mapper";

@Controller('auth')
export class AuthController {
    constructor(
        private service: AuthService,
        private mapper: UserDtoMapper
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: UserDto) {
        return this.service.signIn(this.mapper.toModel(signInDto));
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signUp(@Body() signUpDto: UserDto) {
        this.service.signUp(this.mapper.toModel(signUpDto))
        return;
    }

    @HttpCode(HttpStatus.OK)
    @Delete('revocation')
    revoke(@Body() signInDto: UserDto) {
        return this.service.revoke(signInDto.username);
    }

    @HttpCode(HttpStatus.OK)
    @Post('validation')
    validateToken(@Body() body: Record<string, string>) {
        return this.service.validateToken(body.token);
    }

}
