import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User} from "../entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async find(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({where: { username: username }});
    }

    async delete(username: string): Promise<void> {
        await this.userRepository.delete({username: username});
    }
}
