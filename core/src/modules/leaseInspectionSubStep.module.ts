import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaseInspectionSubStep } from '@domain/entities/leaseInspectionSubStep.entity';
import { LeaseInspectionStepModule } from '@modules/leaseInspectionStep.module';
import { LeaseInspectionSubStepRepository } from '@domain/repositories/leaseInspectionSubStep.repository';
import { LeaseInspectionSubStepController } from '@infrastructure/controllers/leaseInspectionSubStep.controller';
import { LeaseInspectionSubStepService } from '@domain/services/leaseInspectionSubStep.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([LeaseInspectionSubStep]),
        LeaseInspectionStepModule,
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
