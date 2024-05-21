import { Injectable, NotFoundException } from '@nestjs/common';
import { LeaseInspectionStepRepository } from '@domain/repositories/leaseInspectionStep.repository';
import { LeaseInspectionSubStepWithLinkDto } from '@infrastructure/dtos/leaseInspectionSubStepWithLink.dto';
import { LeaseInspectionSubStepDtoMapper } from '@infrastructure/mappers/leaseInspectionSubStep.dto.mapper';
import { LeaseInspectionSubStepWithFileDto } from '@infrastructure/dtos/leaseInspectionSubStepWithFile.dto';
import { PictureDto } from '@infrastructure/dtos/picture.dto';
import { isArray } from 'class-validator';
import { LeaseInspectionSubStepPictureService } from '@domain/services/leaseInspectionSubStepPicture.service';
import { LeaseInspectionSubStepRepository } from '@domain/repositories/leaseInspectionSubStep.repository';
import { LeaseInspectionSubStep } from '@domain/entities/leaseInspectionSubStep.entity';
import { SubElement } from '@domain/entities/subElement.entity';
import { SubElementRepository } from '@domain/repositories/subElement.repository';

@Injectable()
export class LeaseInspectionSubStepService {
    constructor(
        private readonly repository: LeaseInspectionSubStepRepository,
        private readonly leaseInspectionSubStepPictureService: LeaseInspectionSubStepPictureService,  
        private readonly leaseInspectionStepRepository: LeaseInspectionStepRepository,
        private readonly subElementRepository: SubElementRepository
    ) {}

    async create(leaseInspectionSubStepDto: LeaseInspectionSubStepWithFileDto): Promise<LeaseInspectionSubStepWithLinkDto> {
        const leaseInspectionStep = await this.leaseInspectionStepRepository.findById(leaseInspectionSubStepDto.leaseInspectionStepId);
        if (!leaseInspectionStep) {
            throw new NotFoundException('Lease inspection step does not exist');
        }
        const subElement = await this.subElementRepository.findById(leaseInspectionSubStepDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('Sub element does not exist');
        }
        const leaseInspectionSubStep = await this.repository.save(LeaseInspectionSubStepDtoMapper.toModel(leaseInspectionSubStepDto, leaseInspectionStep, subElement));
        const pictures = isArray(leaseInspectionSubStepDto.pictures) ? leaseInspectionSubStepDto.pictures : [leaseInspectionSubStepDto.pictures];
        for (const picture of pictures) {
            await this.leaseInspectionSubStepPictureService.create(leaseInspectionSubStep, picture);
        }
        const picturesUrls: PictureDto[] = await this.leaseInspectionSubStepPictureService.getPicturesUrl(leaseInspectionSubStep.id);
        return LeaseInspectionSubStepDtoMapper.fromModelWithLink(leaseInspectionSubStep, picturesUrls);
    }

    async getByLeaseInspectionStep(leaseInspectionStepId: string): Promise<LeaseInspectionSubStepWithLinkDto[]> {
        const leaseInspectionSubSteps: LeaseInspectionSubStep[] = await this.repository.findByLeaseInspectionStep(leaseInspectionStepId);
        if (leaseInspectionSubSteps.length === 0) {
            throw new NotFoundException('No lease inspection steps found for this lease inspection');
        }

        const leaseInspectionSubStepWithLinkDtos = leaseInspectionSubSteps.map(async leaseInspectionSubStep => {
            const picturesUrls: PictureDto[] = await this.leaseInspectionSubStepPictureService.getPicturesUrl(leaseInspectionSubStep.id);
            return LeaseInspectionSubStepDtoMapper.fromModelWithLink(leaseInspectionSubStep, picturesUrls);
        });
        return Promise.all(leaseInspectionSubStepWithLinkDtos);
    }

    async get(leaseInspectionSubStepId: string): Promise<LeaseInspectionSubStepWithLinkDto> {
        const leaseInspectionSubStep: LeaseInspectionSubStep = await this.repository.findById(leaseInspectionSubStepId);
        if (!leaseInspectionSubStep) {
            throw new NotFoundException('Lease inspection step does not exist');
        }
        const picturesUrls: PictureDto[] = await this.leaseInspectionSubStepPictureService.getPicturesUrl(leaseInspectionSubStepId);
        return LeaseInspectionSubStepDtoMapper.fromModelWithLink(leaseInspectionSubStep, picturesUrls);
    }

    async update(leaseInspectionSubStepId: string, leaseInspectionSubStepDto: LeaseInspectionSubStepWithFileDto): Promise<LeaseInspectionSubStepWithLinkDto> {
        leaseInspectionSubStepDto.id = leaseInspectionSubStepId;
        const leaseInspectionStep = await this.leaseInspectionStepRepository.findById(leaseInspectionSubStepDto.leaseInspectionStepId);
        if (!leaseInspectionStep) {
            throw new NotFoundException('Lease inspection step does not exist');
        }

        const subElement = await this.subElementRepository.findById(leaseInspectionSubStepDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('Sub element does not exist');
        }

        const pictures = isArray(leaseInspectionSubStepDto.pictures) ? leaseInspectionSubStepDto.pictures : [leaseInspectionSubStepDto.pictures];
        const leaseInspectionSubStepUpdated = LeaseInspectionSubStepDtoMapper.toModel(leaseInspectionSubStepDto, leaseInspectionStep, subElement);
        for (const picture of pictures) {
            await this.leaseInspectionSubStepPictureService.create(leaseInspectionSubStepUpdated, picture);
        }
        const picturesUrl: PictureDto[] = await this.leaseInspectionSubStepPictureService.getPicturesUrl(leaseInspectionSubStepId); 
        return LeaseInspectionSubStepDtoMapper.fromModelWithLink(await this.repository.updateElement(leaseInspectionSubStepUpdated), picturesUrl);
    }

    async deletePicturesByPictureId(PicturesId : string) {
        return await this.leaseInspectionSubStepPictureService.delete(PicturesId);
    }

}
