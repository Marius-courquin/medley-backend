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


@Module({
    imports: [
        TypeOrmModule.forFeature([LeaseInspectionSubStep]),
        LeaseInspectionStepModule,
        forwardRef( () => LeaseInspectionSubStepPictureModule),
        FileModule,
        NestjsFormDataModule,
        SubElementModule
    ],
    providers: [
        LeaseInspectionSubStepService,
        LeaseInspectionSubStepRepository
    ],
    exports: [
        LeaseInspectionSubStepRepository
    ],
    controllers: [LeaseInspectionSubStepController]
})
export class LeaseInspectionSubStepModule {}
