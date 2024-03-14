
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService} from "./user.service";
import { JwtService } from '@nestjs/jwt';
import {User} from "../entities/user.entity";
import hashing from "../utils/hashing";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.find(username);
        if (!user || hashing.comparePassword(pass, user.password) === false) {
            throw new UnauthorizedException( 'Invalid credentials');
        }
        const payload = { id: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(username: string, password: string): Promise<void> {
        const user = await this.usersService.find(username);
        if (user) {
            throw new UnauthorizedException( 'User already exists');
        }
        await this.usersService.create(new User(username, hashing.hashPassword(password)));
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
