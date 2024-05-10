import { Injectable, NotFoundException } from '@nestjs/common';
import { LeaseInspectionSubStep } from '@domain/entities/leaseInspectionSubStep.entity';
import { LeaseInspectionSubStepRepository } from '@domain/repositories/leaseInspectionSubStep.repository';
import { LeaseInspectionSubStepDto } from '@infrastructure/dtos/leaseInspectionSubStep.dto';
import { LeaseInspectionSubStepDtoMapper } from '@infrastructure/mappers/leaseInspectionSubStep.dto.mapper';
import { LeaseInspectionStepRepository } from '@domain/repositories/leaseInspectionStep.repository';

@Injectable()
export class LeaseInspectionSubStepService {
    constructor(
        private readonly repository: LeaseInspectionSubStepRepository,
        private readonly leaseInspectionStepRepository: LeaseInspectionStepRepository
    ) {}

    async create(leaseInspectionSubStepDto: LeaseInspectionSubStepDto): Promise<LeaseInspectionSubStepDto> {
        const leaseInspectionStep = await this.leaseInspectionStepRepository.findById(leaseInspectionSubStepDto.leaseInspectionStepId);
        if (!leaseInspectionStep) {
            throw new NotFoundException('Lease inspection step does not exist');
        }

        const leaseInspectionSubStep = LeaseInspectionSubStepDtoMapper.toModel(leaseInspectionSubStepDto, leaseInspectionStep);
        return LeaseInspectionSubStepDtoMapper.fromModel(await this.repository.save(leaseInspectionSubStep));
    }

    async getByLeaseInspectionStep(leaseInspectionStepId: string): Promise<LeaseInspectionSubStepDto[]> {
        const leaseInspectionSubSteps: LeaseInspectionSubStep[] = await this.repository.findByLeaseInspectionStep(leaseInspectionStepId);
        if (leaseInspectionSubSteps.length === 0) {
            throw new NotFoundException('No lease inspection sub steps found for this lease inspection step');
        }
        
        return leaseInspectionSubSteps.map(leaseInspectionSubStep => LeaseInspectionSubStepDtoMapper.fromModel(leaseInspectionSubStep));
    }

    async get(leaseInspectionSubStepId: string): Promise<LeaseInspectionSubStepDto> {
        const leaseInspectionSubStep: LeaseInspectionSubStep = await this.repository.findById(leaseInspectionSubStepId);
        if (!leaseInspectionSubStep) {
            throw new NotFoundException('Lease inspection sub step does not exist');
        }

        return LeaseInspectionSubStepDtoMapper.fromModel(leaseInspectionSubStep);
    }

    async update(leaseInspectionSubStepId: string, leaseInspectionSubStepDto: LeaseInspectionSubStepDto): Promise<LeaseInspectionSubStepDto> {
        leaseInspectionSubStepDto.id = leaseInspectionSubStepId;
        const leaseInspectionStep = await this.leaseInspectionStepRepository.findById(leaseInspectionSubStepDto.leaseInspectionStepId);
        if (!leaseInspectionStep) {
            throw new NotFoundException('Lease inspection step does not exist');
        }

        const leaseInspectionSubStep = LeaseInspectionSubStepDtoMapper.toModel(leaseInspectionSubStepDto, leaseInspectionStep);
        return LeaseInspectionSubStepDtoMapper.fromModel(await this.repository.updateElement(leaseInspectionSubStep));
    }

}
