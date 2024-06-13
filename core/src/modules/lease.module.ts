import {forwardRef, Module} from '@nestjs/common';
import {LeaseService} from '@domain/services/lease.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Lease} from '@domain/entities/lease.entity';
import {LeaseRepository} from '@domain/repositories/lease.repository';
import {ThirdModule} from '@modules/third.module';
import {LeaseController} from '@/infrastructure/controllers/lease.controller';
import {AgentModule} from '@/modules/agent.module';
import {EstateRepository} from "@domain/repositories/estate.repository";
import {
    LeaseInspectionCreationOnLeaseCreationListener
} from "@domain/listeners/leaseInspectionCreationOnLeaseCreation.listener";
import {AdaptersModule} from "@modules/adapters.module";
import {LeaseInspectionModule} from "@modules/leaseInspection.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Lease]),
        ThirdModule,
        AgentModule,
        forwardRef(() => LeaseInspectionModule),
        AdaptersModule
    ],
    providers: [
        LeaseService,
        LeaseRepository,
        EstateRepository,
        LeaseInspectionCreationOnLeaseCreationListener
    ],
    exports: [
        LeaseRepository,
        LeaseService
    ],
    controllers: [LeaseController]
})
export class LeaseModule {}
