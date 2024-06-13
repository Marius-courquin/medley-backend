import { Injectable, NotFoundException } from '@nestjs/common';
import { LeaseRepository } from '@domain/repositories/lease.repository';
import { LeaseDto } from '@infrastructure/dtos/lease.dto';
import { Lease } from '@domain/entities/lease.entity';
import { AgentRepository } from '@domain/repositories/agent.repository';
import { ThirdRepository } from '@domain/repositories/third.repository';
import { LeaseDtoMapper } from '@infrastructure/mappers/lease.dto.mapper';
import { EstateRepository } from '@domain/repositories/estate.repository';
import {Third} from "@domain/entities/third.entity";
import {Estate} from "@domain/entities/estate.entity";
import { EventEmitter2 } from '@nestjs/event-emitter';
import {LeaseInspectionCreationOnLeaseCreationEvent} from "@domain/events/LeaseInspectionCreationOnLeaseCreation.event";

@Injectable()
export class LeaseService {
    constructor(
        private readonly leaseRepository: LeaseRepository,
        private readonly agentRepository: AgentRepository,
        private readonly thirdRepository: ThirdRepository,
        private readonly estateRepository: EstateRepository,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async create(leaseDto: LeaseDto): Promise<LeaseDto> {
        const agent = await this.agentRepository.findById(leaseDto.agentId);
        const tenant = await this.thirdRepository.findById(leaseDto.tenantId);
        if (!tenant) {
            throw new NotFoundException('tenant does not exist');
        }
        const estate = await this.estateRepository.findById(leaseDto.estateId);
        if (!estate) {
            throw new NotFoundException('Estate does not exist');
        }
        const lease = await this.leaseRepository.save(LeaseDtoMapper.toModel(leaseDto, estate, agent, tenant));
        const event = new LeaseInspectionCreationOnLeaseCreationEvent(lease);
        this.eventEmitter.emit(LeaseInspectionCreationOnLeaseCreationEvent.eventName, event);
        return LeaseDtoMapper.fromModel(lease);
    }

    async getByAgent(agentId: string): Promise<LeaseDto[]> {
        const leases: Lease[] = await this.leaseRepository.findByAgent(agentId);
        if (leases.length === 0) {
            throw new NotFoundException('No leases found for this agent');
        }
        return leases.map(lease => LeaseDtoMapper.fromModel(lease));
    }

    async getByTenant(tenantId: string): Promise<LeaseDto[]> {
        const tenant: Third = await this.thirdRepository.findById(tenantId);
        if (!tenant) {
            throw new NotFoundException('tenant does not exist');
        }
        const leases: Lease[] = await this.leaseRepository.findByTenant(tenantId);
        return leases.map(lease => LeaseDtoMapper.fromModel(lease));
    }

    async getByEstate(estateId: string): Promise<LeaseDto> {
        const estate: Estate = await this.estateRepository.findById(estateId);
        if (!estate) {
            throw new NotFoundException('estate does not exist');
        }
        const lease: Lease = await this.leaseRepository.findByEstate(estateId);
        if (!lease) {
            throw new NotFoundException('no actual lease for this estate');
        }
        return LeaseDtoMapper.fromModel(lease);
    }

    async get(leaseId: string): Promise<LeaseDto> {
        const lease:Lease = await this.leaseRepository.findById(leaseId);
        if (!lease) {
            throw new NotFoundException('lease does not exist');
        }
        return LeaseDtoMapper.fromModel(lease);
    }

    async update(leaseId: string, leaseDto: LeaseDto): Promise<LeaseDto> {
        leaseDto.id = leaseId;
        const agent = await this.agentRepository.findById(leaseDto.agentId);
        const tenant = await this.thirdRepository.findById(leaseDto.tenantId);
        if (!tenant) {
            throw new NotFoundException('tenant does not exist');
        }
        const estate = await this.estateRepository.findById(leaseDto.estateId);
        if (!estate) {
            throw new NotFoundException('Estate does not exist');
        }
        const lease: Lease = LeaseDtoMapper.toModel(leaseDto, estate, agent, tenant);
        return LeaseDtoMapper.fromModel(await this.leaseRepository.updateElement(lease));
    }

}
