import {forwardRef, Module} from '@nestjs/common';
import { LeaseInspectionService } from '@domain/services/leaseInspection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaseInspection } from '@domain/entities/leaseInspection.entity';
import { LeaseModule } from '@modules/lease.module';
import { LeaseInspectionRepository } from '@domain/repositories/leaseInspection.repository';
import { LeaseInspectionController } from '@infrastructure/controllers/leaseInspection.controller';
import { AgentModule } from '@modules/agent.module';
import {LeaseInspectionClosedListener} from "@domain/listeners/leaseInspectionClosed.listener";
import {RoomModule} from "@modules/room.module";
import {LeaseInspectionStepModule} from "@modules/leaseInspectionStep.module";
import { Signature } from '@/domain/entities/signature.entity';
import { SignatureService } from '@/domain/services/signature.service';
import { SignatureModule } from './signature.module';
import { SignatureRepository } from '@/domain/repositories/signature.repository';
import { FileModule } from './file.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([LeaseInspection]),
        LeaseModule,
        AgentModule,
        RoomModule,
        forwardRef(() => LeaseInspectionStepModule)
        AgentModule,
        FileModule,
    ],
    providers: [
        LeaseInspectionService,
        LeaseInspectionRepository,
        SignatureService,
        SignatureRepository,
        LeaseInspectionRepository,
        LeaseInspectionClosedListener
    ],
    exports: [
        LeaseInspectionRepository
    ],
    controllers: [LeaseInspectionController]
})
export class LeaseInspectionModule {}
