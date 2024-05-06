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

    async create(leaseDto: LeaseDto): Promise<LeaseDto> {
        const agent = await this.agentRepository.findById(leaseDto.agentId);
        const tenant = await this.thirdRepository.findById(leaseDto.tenantId);
        const estate = await this.estateRepository.findById(leaseDto.estateId);
        const lease = LeaseDtoMapper.toModel(leaseDto, estate, agent, tenant);
        console.log(lease);

        return LeaseDtoMapper.fromModel(await this.leaseRepository.save(lease));


    }

    async getByAgent(agentId: string): Promise<LeaseDto[]> {
        const leases: Lease[] = await this.leaseRepository.findByAgent(agentId);
        if (leases.length === 0) {
            throw new NotFoundException('No leases found for this agent');
        }
        return leases.map(lease => LeaseDtoMapper.fromModel(lease));
    }

    async getByTenant(tenantId: string): Promise<LeaseDto[]> {
        const leases: Lease[] = await this.leaseRepository.findByTenant(tenantId);
        if (leases.length === 0) {
            throw new NotFoundException('No leases found for this tenant');
        }
        return leases.map(lease => LeaseDtoMapper.fromModel(lease));
    }

    async get(leaseId: string): Promise<LeaseDto> {
        const lease:Lease = await this.leaseRepository.findById(leaseId);
        if (!lease) {
            throw new NotFoundException('Lease does not exist');
        }
        return LeaseDtoMapper.fromModel(lease);
    }

    async update(leaseId: string, leaseDto: LeaseDto): Promise<LeaseDto> {
        leaseDto.id = leaseId;
        const agent = await this.agentRepository.findById(leaseDto.agentId);
        const tenant = await this.thirdRepository.findById(leaseDto.tenantId);
        const estate = await this.estateRepository.findById(leaseDto.estateId);
        const lease: Lease = LeaseDtoMapper.toModel(leaseDto, estate, agent, tenant);
        return LeaseDtoMapper.fromModel(await this.leaseRepository.updateElement(lease));
    }

}
