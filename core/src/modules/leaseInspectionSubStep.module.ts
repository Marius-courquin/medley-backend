import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '@modules/file.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { LeaseInspectionSubStep } from '@domain/entities/leaseInspectionSubStep.entity';
import { LeaseInspectionStepModule } from '@modules/leaseInspectionStep.module';
import { LeaseInspectionSubStepController } from '@infrastructure/controllers/leaseInspectionSubStep.controller';
import { LeaseInspectionSubStepService } from '@domain/services/leaseInspectionSubStep.service';
import { LeaseInspectionSubStepRepository } from '@domain/repositories/leaseInspectionSubStep.repository';
import { LeaseInspectionSubStepPictureModule } from '@modules/leaseInspectionSubStepPicture.module';
import { SubElementModule } from '@modules/subElement.module';
import {
    ElementCreatedOnLeaseInspectionCreationListener
} from "@domain/listeners/elementCreatedOnLeaseInspectionCreation.listener";


@Module({
    imports: [
        TypeOrmModule.forFeature([LeaseInspectionSubStep]),
        forwardRef( () => LeaseInspectionStepModule),
        forwardRef( () => LeaseInspectionSubStepPictureModule),
        FileModule,
        NestjsFormDataModule,
        SubElementModule
    ],
    providers: [
        LeaseInspectionSubStepService,
        LeaseInspectionSubStepRepository,
        ElementCreatedOnLeaseInspectionCreationListener
    ],
    exports: [
        LeaseInspectionSubStepRepository,
        LeaseInspectionSubStepService
    ],
    controllers: [LeaseInspectionSubStepController]
})
export class LeaseInspectionSubStepModule {}
