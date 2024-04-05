import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "./user.service";
import {JwtService} from '@nestjs/jwt';
import {User} from "../entities/user.entity";
import {Hashing} from "@utils/hashing";
import {UserLoginDto} from "@infrastructure/dtos/userLogin.dto";
import {UserSignupDto} from "@infrastructure/dtos/userSignup.dto";
import {UserRevocationDto} from "@infrastructure/dtos/userRevocation.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private hashing: Hashing
    ) {}

    async signIn(
        userToSignIn: UserLoginDto
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findByUsername(userToSignIn.username);
        if (!user || this.hashing.comparePassword(userToSignIn.password, user.password) === false) {
            throw new UnauthorizedException( 'Invalid credentials');
        }
        const payload = { sub: user.id, id: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(userToSignUp: UserSignupDto): Promise<User> {
        const user = await this.usersService.findByUsername(userToSignUp.username);
        if (user) {
            throw new UnauthorizedException( 'User already exists');
        }
        userToSignUp.password = this.hashing.hashPassword(userToSignUp.password);
        return await this.usersService.create(User.of(userToSignUp.username, userToSignUp.password));
    }

    async revoke(userToRevoke: UserRevocationDto): Promise<void> {
        const user = await this.usersService.findByUsername(userToRevoke.username);
        if (!user) {
            throw new UnauthorizedException( 'User does not exist');
        }
        await this.usersService.deleteByUsername(userToRevoke.username);
    }

    async validateToken(token: string): Promise<{id: string}> {
        try {
            await this.jwtService.verifyAsync(token);
            const payload = this.jwtService.decode(token);
            return { id : payload.id };
        } catch (e) {
            throw new UnauthorizedException( 'Invalid token');
        }
    }
}
