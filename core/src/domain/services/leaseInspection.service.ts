import { Injectable, NotFoundException } from '@nestjs/common';
import { LeaseRepository } from '@domain/repositories/lease.repository';
import { Agent } from '@domain/entities/agent.entity';
import { AgentRepository } from '@domain/repositories/agent.repository';
import { LeaseInspection } from '@domain/entities/leaseInspection.entity';
import { LeaseInspectionRepository } from '@domain/repositories/leaseInspection.repository';
import { LeaseInspectionDto } from '@infrastructure/dtos/leaseInspection.dto';
import { LeaseInspectionDtoMapper } from '@infrastructure/mappers/leaseInspection.dto.mapper';

@Injectable()
export class LeaseInspectionService {
    constructor(
        private readonly leaseRepository: LeaseRepository,
        private readonly agentRepository: AgentRepository,
        private readonly repository: LeaseInspectionRepository,
    ) {}

    async create(leaseInspectionDto: LeaseInspectionDto): Promise<LeaseInspectionDto> {
        const agent : Agent  = await this.agentRepository.findById(leaseInspectionDto.agentId);
        const lease = await this.leaseRepository.findById(leaseInspectionDto.leaseId);
        if (!lease) {
            throw new NotFoundException('Lease does not exist');
        }
        const leaseInspection = LeaseInspectionDtoMapper.toModel(leaseInspectionDto, lease, agent);

        return LeaseInspectionDtoMapper.fromModel(await this.repository.save(leaseInspection));
    }

    async getByLease(leaseId: string): Promise<LeaseInspectionDto[]> {
        const leaseInspections: LeaseInspection[] = await this.repository.findByLease(leaseId);
        if (leaseInspections.length === 0) {
            throw new NotFoundException('No lease inspections found for this lease');
        }
        return leaseInspections.map(leaseInspection => LeaseInspectionDtoMapper.fromModel(leaseInspection));
    }

    async get(leaseId: string): Promise<LeaseInspectionDto> {
        const leaseInspection: LeaseInspection = await this.repository.findById(leaseId);
        if (!leaseInspection) {
            throw new NotFoundException('Lease inspection does not exist');
        }
        return LeaseInspectionDtoMapper.fromModel(leaseInspection);
    }

    async update(leaseInspectionId: string, leaseInspectionDto: LeaseInspectionDto): Promise<LeaseInspectionDto> {
        leaseInspectionDto.id = leaseInspectionId;
        const agent = await this.agentRepository.findById(leaseInspectionDto.agentId);
        const lease = await this.leaseRepository.findById(leaseInspectionDto.leaseId);
        if (!lease) {
            throw new NotFoundException('Lease does not exist');
        }
        const leaseInspection = LeaseInspectionDtoMapper.toModel(leaseInspectionDto, lease, agent);
        return LeaseInspectionDtoMapper.fromModel(await this.repository.updateElement(leaseInspection));
    }

}
