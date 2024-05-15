import { Injectable, NotFoundException } from '@nestjs/common';
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';
import { LeaseInspectionStepRepository } from '@domain/repositories/leaseInspectionStep.repository';
import { LeaseInspectionStepWithLinkDto } from '@infrastructure/dtos/leaseInspectionStepWithLink.dto';
import { LeaseInspectionStepDtoMapper } from '@infrastructure/mappers/leaseInspectionStep.dto.mapper';
import { LeaseInspectionRepository } from '@domain/repositories/leaseInspection.repository';
import { LeaseInspectionStepWithFileDto } from '@infrastructure/dtos/leaseInspectionStepWithFile.dto';
import { LeaseInspectionStepPictureService } from '@domain/services/leaseInspectionStepPicture.service';

@Injectable()
export class LeaseInspectionStepService {
    constructor(
        private readonly repository: LeaseInspectionStepRepository,
        private readonly leaseInspectionStepPictureService: LeaseInspectionStepPictureService,  
        private readonly leaseInspectionRepository: LeaseInspectionRepository
    ) {}

    async create(leaseInspectionStepDto: LeaseInspectionStepWithFileDto): Promise<LeaseInspectionStepWithLinkDto> {
        const leaseInspection = await this.leaseInspectionRepository.findById(leaseInspectionStepDto.leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('Lease inspection does not exist');
        }

        const leaseInspectionStep = await this.repository.save(LeaseInspectionStepDtoMapper.toModel(leaseInspectionStepDto, leaseInspection));
        for (const picture of leaseInspectionStepDto.pictures) {
            await this.leaseInspectionStepPictureService.create(leaseInspectionStep, picture);
        }
        const picturesUrls: string[] = await this.leaseInspectionStepPictureService.getPicturesUrl(leaseInspectionStep.id);
        return LeaseInspectionStepDtoMapper.fromModelWithLink(leaseInspectionStep, picturesUrls);
    }

    async getByLeaseInspection(leaseInspectionId: string): Promise<LeaseInspectionStepWithLinkDto[]> {
        const leaseInspectionSteps: LeaseInspectionStep[] = await this.repository.findByLeaseInspection(leaseInspectionId);
        if (leaseInspectionSteps.length === 0) {
            throw new NotFoundException('No lease inspection steps found for this lease inspection');
        }

        const leaseInspectionStepWithLinkDtos = leaseInspectionSteps.map(async leaseInspectionStep => {
            const picturesUrls: string[] = await this.leaseInspectionStepPictureService.getPicturesUrl(leaseInspectionStep.id);
            return LeaseInspectionStepDtoMapper.fromModelWithLink(leaseInspectionStep, picturesUrls);
        });
        return Promise.all(leaseInspectionStepWithLinkDtos);
    }

    async get(leaseInspectionStepId: string): Promise<LeaseInspectionStepWithLinkDto> {
        const leaseInspectionStep: LeaseInspectionStep = await this.repository.findById(leaseInspectionStepId);
        if (!leaseInspectionStep) {
            throw new NotFoundException('Lease inspection step does not exist');
        }
        const picturesUrls: string[] = await this.leaseInspectionStepPictureService.getPicturesUrl(leaseInspectionStepId);
        return LeaseInspectionStepDtoMapper.fromModelWithLink(leaseInspectionStep, picturesUrls);
    }

    async update(leaseInspectionStepId: string, leaseInspectionStepDto: LeaseInspectionStepWithFileDto): Promise<LeaseInspectionStepWithLinkDto> {
        leaseInspectionStepDto.id = leaseInspectionStepId;
        const leaseInspection = await this.leaseInspectionRepository.findById(leaseInspectionStepDto.leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('Lease inspection does not exist');
        }

        await this.leaseInspectionStepPictureService.updateLeaseInspectionStepPicture(leaseInspectionStepId, leaseInspectionStepDto.pictures);
        const picturesUrl: string[] = await this.leaseInspectionStepPictureService.getPicturesUrl(leaseInspectionStepId);
        const leaseInspectionStep = LeaseInspectionStepDtoMapper.toModel(leaseInspectionStepDto, leaseInspection);

        return LeaseInspectionStepDtoMapper.fromModelWithLink(await this.repository.updateElement(leaseInspectionStep), picturesUrl);
    }

}
