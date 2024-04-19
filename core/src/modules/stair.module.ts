import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElementModule } from "@modules/element.module"
import { StairController } from '@infrastructure/controllers/stair.controller';
import { StairService } from '@domain/services/stair.service';
import { StairRepository } from '@domain/repositories/stair.repository';
import { Stair } from '@domain/entities/stair.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Stair]),
        ElementModule
    ],
    providers: [
        StairService,
        StairRepository
    ],
    exports: [
        StairService
    ],
    controllers: [StairController]
})
export class StairModule {}