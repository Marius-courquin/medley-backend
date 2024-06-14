import {forwardRef, Module} from '@nestjs/common';
import {LeaseInspectionService} from '@domain/services/leaseInspection.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LeaseInspection} from '@domain/entities/leaseInspection.entity';
import {LeaseModule} from '@modules/lease.module';
import {LeaseInspectionRepository} from '@domain/repositories/leaseInspection.repository';
import {LeaseInspectionController} from '@infrastructure/controllers/leaseInspection.controller';
import {AgentModule} from '@modules/agent.module';
import {LeaseInspectionClosedListener} from "@domain/listeners/leaseInspectionClosed.listener";
import {RoomModule} from "@modules/room.module";
import {LeaseInspectionStepModule} from "@modules/leaseInspectionStep.module";
import {SignatureService} from '@/domain/services/signature.service';
import {SignatureRepository} from '@/domain/repositories/signature.repository';
import {FileModule} from './file.module';
import {NestjsFormDataModule} from "nestjs-form-data";
import {AdaptersModule} from "@modules/adapters.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([LeaseInspection]),
        forwardRef(() => LeaseModule),
        AgentModule,
        RoomModule,
        forwardRef(() => LeaseInspectionStepModule),
        AgentModule,
        FileModule,
        NestjsFormDataModule,
        AdaptersModule
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
        LeaseInspectionRepository,
        LeaseInspectionService
    ],
    controllers: [LeaseInspectionController]
})
export class LeaseInspectionModule {}
