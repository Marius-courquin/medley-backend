import { Module } from '@nestjs/common';
import { EstateService } from "@domain/services/estate.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Estate} from "@domain/entities/estate.entity";
import {EstateRepository} from "@domain/repositories/estate.repository";
import { ThirdModule } from './third.module';
import { EstateController } from '@/infrastructure/controllers/estate.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Estate]),
        ThirdModule
    ],
    providers: [
        EstateService,
        EstateRepository
    ],
    exports: [
        EstateService
    ],
    controllers: [EstateController]
})
export class EstateModule {}