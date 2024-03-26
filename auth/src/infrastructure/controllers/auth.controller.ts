import {Body, Controller, Delete, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from '@domain/services/auth.service';
import {UserDto} from "../dtos/user.dto";
import {UserDtoMapper} from "../mappers/user.dto.mapper";

@Controller('auth')
export class AuthController {
    constructor(
        private service: AuthService,
        private mapper: UserDtoMapper
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() userDto: UserDto) {
        return this.service.signIn(this.mapper.toModel(userDto));
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signUp(@Body() userDto: UserDto) {
        await this.service.signUp(this.mapper.toModel(userDto))
        return Promise.resolve();
    }

    @HttpCode(HttpStatus.OK)
    @Delete('revocation')
    revoke(@Body() userDto: UserDto) {
        this.service.revoke(userDto.username);
        return Promise.resolve();
    }

    @HttpCode(HttpStatus.OK)
    @Post('validation')
    async validateToken(@Body() body: Record<string, string>) {
        return this.service.validateToken(body.token);
    }

}
