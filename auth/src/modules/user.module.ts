import { Module } from '@nestjs/common';
import { UserService } from "@domain/services/user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "@domain/entities/user.entity";
import {UserRepository} from "@domain/repositories/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [
        UserService,
        UserRepository
    ],
    exports: [
        UserService
    ],
})
export class UserModule {}
