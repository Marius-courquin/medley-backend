import { Injectable, NotFoundException } from '@nestjs/common';
import { LeaseRepository } from '@domain/repositories/lease.repository';
import { LeaseDto } from '@infrastructure/dtos/lease.dto';
import { Lease } from '@domain/entities/lease.entity';
import { AgentRepository } from '@domain/repositories/agent.repository';
import { ThirdRepository } from '@domain/repositories/third.repository';
import { LeaseDtoMapper } from '@infrastructure/mappers/lease.dto.mapper';
import { EstateRepository } from '@domain/repositories/estate.repository';
@Injectable()
export class LeaseService {
    constructor(
        private readonly leaseRepository: LeaseRepository,
        private readonly agentRepository: AgentRepository,
        private readonly thirdRepository: ThirdRepository,
        private readonly estateRepository: EstateRepository
    ) {}

    async createLease(leaseDto: LeaseDto): Promise<LeaseDto> {
        const agent = await this.agentRepository.findById(leaseDto.agentId);
        const tenant = await this.thirdRepository.findById(leaseDto.tenantId);
        const estate = await this.estateRepository.findById(leaseDto.estateId);
        const lease = LeaseDtoMapper.toModel(leaseDto, estate, agent, tenant);
        console.log(lease);

        return LeaseDtoMapper.fromModel(await this.leaseRepository.save(lease));


    }

    async findByAgent(agentId: string): Promise<LeaseDto[]> {
        const leases: Lease[] = await this.leaseRepository.findByAgent(agentId);
        console.log(leases);
        if (leases.length === 0) {
            throw new NotFoundException('No leases found for this agent');
        }
        return leases.map(lease => LeaseDtoMapper.fromModel(lease));
    }

    async findByTenant(tenantId: string): Promise<LeaseDto[]> {
        const leases: Lease[] = await this.leaseRepository.findByTenant(tenantId);
        if (leases.length === 0) {
            throw new NotFoundException('No leases found for this tenant');
        }
        return leases.map(lease => LeaseDtoMapper.fromModel(lease));
    }

    async getLease(leaseId: string): Promise<LeaseDto> {
        const lease:Lease = await this.leaseRepository.findById(leaseId);
        console.log(lease);
        if (!lease) {
            throw new NotFoundException('Lease does not exist');
        }
        return LeaseDtoMapper.fromModel(lease);
    }

    async updateLease(leaseId: string, leaseDto: LeaseDto): Promise<LeaseDto> {
        // You would need to verify the agent and the tenant as well before updating a lease
        // And map the DTO to a lease entity before saving
        // This is a simplified placeholder logic
        leaseDto.id = leaseId;
        const agent = await this.agentRepository.findById(leaseDto.agentId);
        const tenant = await this.thirdRepository.findById(leaseDto.tenantId);
        const estate = await this.estateRepository.findById(leaseDto.estateId);
        const lease: Lease = LeaseDtoMapper.toModel(leaseDto, estate, agent, tenant);
        console.log(lease);
        return LeaseDtoMapper.fromModel(await this.leaseRepository.updateLease(lease));
    }

    // Additional methods for lease-specific logic can be added here
}
