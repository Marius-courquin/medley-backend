import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from "@modules/file.module";
import { FurnishingModule } from "@modules/furnishing.module";
import { FurnishingPicture } from '@domain/entities/furnishingPicture.entity';
import { FurnishingPictureService } from '@domain/services/furnishingPicture.service';
import { FurnishingPictureRepository } from '@domain/repositories/furnishingPicture.repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([FurnishingPicture]),
        forwardRef( () => FurnishingModule),
        FileModule
    ],
    providers: [
        FurnishingPictureService,
        FurnishingPictureRepository
    ],
    exports: [
        FurnishingPictureRepository,
        FurnishingPictureService
    ],
})
export class furnishingPictureModule {}
