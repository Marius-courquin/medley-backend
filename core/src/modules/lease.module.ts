import { Module } from '@nestjs/common';
import { LeaseService } from '@domain/services/lease.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lease } from '@domain/entities/lease.entity';
import { LeaseRepository } from '@domain/repositories/lease.repository';
import { ThirdModule } from './third.module';
import { LeaseController } from '@/infrastructure/controllers/lease.controller';
import { AgentModule } from '@/modules/agent.module';
import {EstateRepository} from "@domain/repositories/estate.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Lease]),
        ThirdModule,
        AgentModule



    ],
    providers: [
        LeaseService,
        LeaseRepository,
        EstateRepository
    ],
    exports: [
        LeaseService,
        LeaseRepository
    ],
    controllers: [LeaseController]
})
export class LeaseModule {}
