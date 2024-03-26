import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "./user.service";
import {JwtService} from '@nestjs/jwt';
import {User} from "../entities/user.entity";
import {Hashing} from "../../utils/hashing";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private hashing: Hashing
    ) {}

    async signIn(
        userToSignIn: User
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.find(userToSignIn.username);
        if (!user || this.hashing.comparePassword(userToSignIn.password, user.password) === false) {
            throw new UnauthorizedException( 'Invalid credentials');
        }
        const payload = { sub: user.id, id: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(userToSignUp: User): Promise<User> {
        const user = await this.usersService.find(userToSignUp.username);
        if (user) {
            throw new UnauthorizedException( 'User already exists');
        }
        return await this.usersService.create(user);
    }

    async revoke(username: string): Promise<void> {
        const user = await this.usersService.find(username);
        if (!user) {
            throw new UnauthorizedException( 'User does not exist');
        }
        await this.usersService.delete(username);
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
