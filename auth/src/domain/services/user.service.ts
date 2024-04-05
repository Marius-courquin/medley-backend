import { Injectable } from '@nestjs/common';
import { User} from "../entities/user.entity";
import {UserRepository} from "../repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository,
    ) {}

    async create(user: User): Promise<User> {
        return this.repository.save(user);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.repository.findByUsername(username);
    }

    async deleteByUsername(username: string): Promise<void> {
        await this.repository.deleteByUsername(username);
    }
}
