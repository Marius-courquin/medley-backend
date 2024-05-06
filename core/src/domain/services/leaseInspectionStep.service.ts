import { Injectable, NotFoundException } from '@nestjs/common';
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';
import { LeaseInspectionStepRepository } from '@domain/repositories/leaseInspectionStep.repository';
import { LeaseInspectionStepDto } from '@infrastructure/dtos/leaseInspectionStep.dto';
import { LeaseInspectionStepDtoMapper } from '@infrastructure/mappers/leaseInspectionStep.dto.mapper';
import { LeaseInspectionRepository } from '@domain/repositories/leaseInspection.repository';

@Injectable()
export class LeaseInspectionStepService {
    constructor(
        private readonly repository: LeaseInspectionStepRepository,
        private readonly leaseInspectionRepository: LeaseInspectionRepository
    ) {}

    async create(leaseInspectionStepDto: LeaseInspectionStepDto): Promise<LeaseInspectionStepDto> {
        const leaseInspection = await this.leaseInspectionRepository.findById(leaseInspectionStepDto.leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('Lease inspection does not exist');
        }

        const leaseInspectionStep = LeaseInspectionStepDtoMapper.toModel(leaseInspectionStepDto, leaseInspection);
        return LeaseInspectionStepDtoMapper.fromModel(await this.repository.save(leaseInspectionStep));
    }

    async getByLeaseInspection(leaseInspectionId: string): Promise<LeaseInspectionStepDto[]> {
        const leaseInspectionSteps: LeaseInspectionStep[] = await this.repository.findByLeaseInspection(leaseInspectionId);
        if (leaseInspectionSteps.length === 0) {
            throw new NotFoundException('No lease inspection steps found for this lease inspection');
        }
        
        return leaseInspectionSteps.map(leaseInspectionStep => LeaseInspectionStepDtoMapper.fromModel(leaseInspectionStep));
    }

    async get(leaseInspectionStepId: string): Promise<LeaseInspectionStepDto> {
        const leaseInspectionStep: LeaseInspectionStep = await this.repository.findById(leaseInspectionStepId);
        if (!leaseInspectionStep) {
            throw new NotFoundException('Lease inspection step does not exist');
        }

        return LeaseInspectionStepDtoMapper.fromModel(leaseInspectionStep);
    }

    async update(leaseInspectionStepId: string, leaseInspectionStepDto: LeaseInspectionStepDto): Promise<LeaseInspectionStepDto> {
        leaseInspectionStepDto.id = leaseInspectionStepId;
        const leaseInspection = await this.leaseInspectionRepository.findById(leaseInspectionStepDto.leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('Lease inspection does not exist');
        }

        const leaseInspectionStep = LeaseInspectionStepDtoMapper.toModel(leaseInspectionStepDto, leaseInspection);
        return LeaseInspectionStepDtoMapper.fromModel(await this.repository.updateElement(leaseInspectionStep));
    }

}
