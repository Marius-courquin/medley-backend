import { Module } from '@nestjs/common';
import { EstateService } from "@domain/services/estate.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Estate} from "@domain/entities/estate.entity";
import {EstateRepository} from "@domain/repositories/estate.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Estate])
    ],
    providers: [
        EstateService,
        EstateRepository
    ],
    exports: [
        EstateService
    ],
})
export class EstateModule {}