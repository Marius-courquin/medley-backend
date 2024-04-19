import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElementModule } from "@modules/element.module"
import { FurnishingController } from '@infrastructure/controllers/furnishing.controller';
import { FurnishingService } from '@domain/services/furnishing.service';
import { FurnishingRepository } from '@domain/repositories/furninshing.repository';
import { Furnishing } from '@domain/entities/furninshing.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Furnishing]),
        ElementModule
    ],
    providers: [
        FurnishingService,
        FurnishingRepository
    ],
    exports: [
        FurnishingService
    ],
    controllers: [FurnishingController]
})
export class FurnishingModule {}