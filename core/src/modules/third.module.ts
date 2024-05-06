import { Module } from '@nestjs/common';
import { ThirdService } from "@domain/services/third.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Third} from "@domain/entities/third.entity";
import {ThirdRepository} from "@domain/repositories/third.repository";
import { ThirdController } from '@infrastructure/controllers/third.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Third])
    ],
    providers: [
        ThirdService,
        ThirdRepository
    ],
    exports: [
        ThirdService,
        ThirdRepository
    ],
    controllers: [ThirdController]
})
export class ThirdModule {}