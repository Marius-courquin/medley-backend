import {Body, Controller, Delete, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from '@domain/services/auth.service';
import {UserLoginDto} from "../dtos/userLogin.dto";
import {UserSignupDto} from "@infrastructure/dtos/userSignup.dto";
import {UserRevocationDto} from "@infrastructure/dtos/userRevocation.dto";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private service: AuthService
    ) {}

    @ApiBody({ type: UserLoginDto })
    @ApiNotFoundResponse(
        {
            description: 'User does not exist',
            schema: {
                example: {
                    statusCode: 404,
                    message: 'User does not exist',
                },
            }
        }
    )
    @ApiUnauthorizedResponse(
        {
            description: 'Invalid credentials',
            schema: {
                example: {
                    statusCode: 401,
                    message: 'Invalid credentials',
                },
            }
        }
    )
    @ApiOkResponse(
        {
            description: 'User logged in successfully',
            schema: {
                type: 'object',
                properties: {
                    access_token: {
                        type: 'string',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWduaTI1IiwiaWQiOiJtYWduaTI1IiwidXNlcm5hbWUiOiJtYWduaTI1In0.7',
                        description: 'The access token to be used in the Authorization header'

                }
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() user: UserLoginDto) {
        return this.service.signIn(user);
    }

    @ApiBody({ type: UserSignupDto })
    @ApiUnauthorizedResponse(
        {
            description: 'User already exists',
            schema: {
                example: {
                    statusCode: 401,
                    message: 'User already exists',
                },
            }
        }
    )
    @ApiOkResponse(
        {
            description: 'User signed up successfully'
        }
    )
    @ApiBadRequestResponse(
        {
            description: 'password must contain only letters, numbers and underscores and be between 6 and 30 characters long',
            schema: {
                example: {
                    statusCode: 400,
                    message: 'password must contain only letters, numbers and underscores and be between 6 and 30 characters long',
                },
            }
        }
    )
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signUp(@Body() user: UserSignupDto) {
        await this.service.signUp(user)
        return Promise.resolve();
    }

    @ApiBody({ type: UserRevocationDto })
    @ApiNotFoundResponse(
        {
            description: 'User does not exist',
            schema: {
                example: {
                    statusCode: 404,
                    message: 'User does not exist',
                },
            }
        }
    )
    @ApiOkResponse(
        {
            description: 'User revoked successfully'
        }
    )
    @HttpCode(HttpStatus.OK)
    @Delete('revocation')
    revoke(@Body() user: UserRevocationDto) {
        this.service.revoke(user);
        return Promise.resolve();
    }

}
