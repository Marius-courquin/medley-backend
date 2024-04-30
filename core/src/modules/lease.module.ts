import { Module } from '@nestjs/common';
import { LeaseService } from '@domain/services/lease.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lease } from '@domain/entities/lease.entity';
import { LeaseRepository } from '@domain/repositories/lease.repository';
import { ThirdModule } from './third.module';
import { LeaseController } from '@/infrastructure/controllers/lease.controller';
import { EstateModule } from './estate.module'; // Import EstateModule if Lease operations depend on Estate
import { AgentModule } from './agent.module'; // Assuming you have a similar setup for Agents

@Module({
    imports: [
        TypeOrmModule.forFeature([Lease]),
        ThirdModule,
        EstateModule,
        AgentModule
    ],
    providers: [
        LeaseService,
        LeaseRepository
    ],
    exports: [
        LeaseService
    ],
    controllers: [LeaseController]
})
export class LeaseModule {}
