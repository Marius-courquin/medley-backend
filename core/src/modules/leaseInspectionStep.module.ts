<<<<<<< HEAD
import { Module, forwardRef } from '@nestjs/common';
=======
import { Module } from '@nestjs/common';
>>>>>>> feat: CRUD on leaseInspectionStep
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';
import { LeaseInspectionModule } from '@modules/leaseInspection.module';
import { LeaseInspectionStepRepository } from '@domain/repositories/leaseInspectionStep.repository';
import { LeaseInspectionStepController } from '@infrastructure/controllers/leaseInspectionStep.controller';
import { LeaseInspectionStepService } from '@domain/services/leaseInspectionStep.service';
<<<<<<< HEAD
import { LeaseInspectionStepPictureModule } from '@modules/leaseInspectionStepPicture.module';
import { FileModule } from '@modules/file.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
=======
>>>>>>> feat: CRUD on leaseInspectionStep


@Module({
    imports: [
        TypeOrmModule.forFeature([LeaseInspectionStep]),
        LeaseInspectionModule,
<<<<<<< HEAD
        forwardRef( () => LeaseInspectionStepPictureModule),
        FileModule,
        NestjsFormDataModule
=======
>>>>>>> feat: CRUD on leaseInspectionStep
    ],
    providers: [
        LeaseInspectionStepService,
        LeaseInspectionStepRepository
    ],
    exports: [
        LeaseInspectionStepRepository
    ],
    controllers: [LeaseInspectionStepController]
})
export class LeaseInspectionStepModule {}
