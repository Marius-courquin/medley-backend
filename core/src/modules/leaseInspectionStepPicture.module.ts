import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaseInspectionStepPicture } from '@domain/entities/leaseInspectionStepPicture.entity';
import { LeaseInspectionStepPictureRepository } from '@/domain/repositories/leaseInspectionStepPicture.repository';
import { LeaseInspectionStepPictureService } from '@/domain/services/leaseInspectionStepPicture.service';
import { LeaseInspectionStepModule } from "@modules/leaseInspectionStep.module";
import { FileModule } from "@modules/file.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([LeaseInspectionStepPicture]),
        forwardRef( () => LeaseInspectionStepModule),
        FileModule,

    ],
    providers: [
        LeaseInspectionStepPictureService,
        LeaseInspectionStepPictureRepository
    ],
    exports: [
        LeaseInspectionStepPictureRepository,
        LeaseInspectionStepPictureService
    ],
})
export class LeaseInspectionStepPictureModule {}
