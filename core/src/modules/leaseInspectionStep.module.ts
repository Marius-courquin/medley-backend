import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LeaseInspectionStep} from '@domain/entities/leaseInspectionStep.entity';
import {LeaseInspectionModule} from '@modules/leaseInspection.module';
import {LeaseInspectionStepRepository} from '@domain/repositories/leaseInspectionStep.repository';
import {LeaseInspectionStepController} from '@infrastructure/controllers/leaseInspectionStep.controller';
import {LeaseInspectionStepService} from '@domain/services/leaseInspectionStep.service';
import {LeaseInspectionStepPictureModule} from '@modules/leaseInspectionStepPicture.module';
import {FileModule} from '@modules/file.module';
import {NestjsFormDataModule} from 'nestjs-form-data';
import {ElementModule} from '@modules/element.module';
import {LeaseInspectionCreatedListener} from "@domain/listeners/leaseInspectionCreated.listener";
import {RoomModule} from "@modules/room.module";
import {LeaseInspectionSubStepModule} from "@modules/leaseInspectionSubStep.module";
import {AdaptersModule} from "@modules/adapters.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([LeaseInspectionStep]),
        forwardRef(() => LeaseInspectionModule),
        forwardRef( () => LeaseInspectionStepPictureModule),
        FileModule,
        NestjsFormDataModule,
        ElementModule,
        RoomModule,
        forwardRef(() => LeaseInspectionSubStepModule),
        AdaptersModule
    ],
    providers: [
        LeaseInspectionStepService,
        LeaseInspectionStepRepository,
        LeaseInspectionCreatedListener
    ],
    exports: [
        LeaseInspectionStepRepository,
        LeaseInspectionStepService
    ],
    controllers: [LeaseInspectionStepController]
})
export class LeaseInspectionStepModule {}
