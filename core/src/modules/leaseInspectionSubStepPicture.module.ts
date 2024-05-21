import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from "@modules/file.module";
import { LeaseInspectionSubStepModule } from "@modules/leaseInspectionSubStep.module";
import { LeaseInspectionSubStepPicture } from '@domain/entities/leaseInspectionSubStepPicture.entity';
import { LeaseInspectionSubStepPictureService } from '@domain/services/leaseInspectionSubStepPicture.service';
import { LeaseInspectionSubStepPictureRepository } from '@domain/repositories/leaseInspectionSubStepPicture.repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([LeaseInspectionSubStepPicture]),
        forwardRef( () => LeaseInspectionSubStepModule),
        FileModule,

    ],
    providers: [
        LeaseInspectionSubStepPictureService,
        LeaseInspectionSubStepPictureRepository
    ],
    exports: [
        LeaseInspectionSubStepPictureRepository,
        LeaseInspectionSubStepPictureService
    ],
})
export class LeaseInspectionSubStepPictureModule {}
