import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElementModule } from "@modules/element.module"
import { FurnishingController } from '@infrastructure/controllers/furnishing.controller';
import { FurnishingService } from '@domain/services/furnishing.service';
import { FurnishingRepository } from '@/domain/repositories/furnishing.repository';
import { Furnishing } from '@domain/entities/furnishing.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Furnishing]),
        forwardRef(() => ElementModule)
    ],
    providers: [
        FurnishingService,
        FurnishingRepository
    ],
    exports: [
        FurnishingService,
        FurnishingRepository
    ],
    controllers: [FurnishingController]
})
export class FurnishingModule {}