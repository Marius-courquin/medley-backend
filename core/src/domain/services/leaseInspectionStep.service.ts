import { Injectable, NotFoundException } from '@nestjs/common';
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';
import { LeaseInspectionStepRepository } from '@domain/repositories/leaseInspectionStep.repository';
import { LeaseInspectionStepWithLinkDto } from '@infrastructure/dtos/leaseInspectionStepWithLink.dto';
import { LeaseInspectionStepDtoMapper } from '@infrastructure/mappers/leaseInspectionStep.dto.mapper';
import { LeaseInspectionRepository } from '@domain/repositories/leaseInspection.repository';
import { LeaseInspectionStepWithFileDto } from '@infrastructure/dtos/leaseInspectionStepWithFile.dto';
import { LeaseInspectionStepPictureService } from '@domain/services/leaseInspectionStepPicture.service';
import { PictureDto } from '@infrastructure/dtos/picture.dto';
import { isArray } from 'class-validator';
import { ElementRepository } from '@domain/repositories/element.repository';

@Injectable()
export class LeaseInspectionStepService {
    constructor(
        private readonly repository: LeaseInspectionStepRepository,
        private readonly leaseInspectionStepPictureService: LeaseInspectionStepPictureService,  
        private readonly leaseInspectionRepository: LeaseInspectionRepository,
        private readonly elementRepository: ElementRepository
    ) {}

    async create(leaseInspectionStepDto: LeaseInspectionStepWithFileDto): Promise<LeaseInspectionStepWithLinkDto> {
        const leaseInspection = await this.leaseInspectionRepository.findById(leaseInspectionStepDto.leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('Lease inspection does not exist');
        }
        const element = await this.elementRepository.findById(leaseInspectionStepDto.elementId);
        if (!element) {
            throw new NotFoundException('Element does not exist');
        }
        const leaseInspectionStep = await this.repository.save(LeaseInspectionStepDtoMapper.toModel(leaseInspectionStepDto, leaseInspection, element));
        const pictures = isArray(leaseInspectionStepDto.pictures) ? leaseInspectionStepDto.pictures : [leaseInspectionStepDto.pictures];
        for (const picture of pictures) {
            await this.leaseInspectionStepPictureService.create(leaseInspectionStep, picture);
        }
        const picturesUrls: PictureDto[] = await this.leaseInspectionStepPictureService.getPicturesUrl(leaseInspectionStep.id);
        return LeaseInspectionStepDtoMapper.fromModelWithLink(leaseInspectionStep, picturesUrls);
    }

    async getByLeaseInspection(leaseInspectionId: string): Promise<LeaseInspectionStepWithLinkDto[]> {
        const leaseInspectionSteps: LeaseInspectionStep[] = await this.repository.findByLeaseInspection(leaseInspectionId);
        if (leaseInspectionSteps.length === 0) {
            throw new NotFoundException('No lease inspection steps found for this lease inspection');
        }

        const leaseInspectionStepWithLinkDtos = leaseInspectionSteps.map(async leaseInspectionStep => {
            const picturesUrls: PictureDto[] = await this.leaseInspectionStepPictureService.getPicturesUrl(leaseInspectionStep.id);
            return LeaseInspectionStepDtoMapper.fromModelWithLink(leaseInspectionStep, picturesUrls);
        });
        return Promise.all(leaseInspectionStepWithLinkDtos);
    }

    async get(leaseInspectionStepId: string): Promise<LeaseInspectionStepWithLinkDto> {
        const leaseInspectionStep: LeaseInspectionStep = await this.repository.findById(leaseInspectionStepId);
        if (!leaseInspectionStep) {
            throw new NotFoundException('Lease inspection step does not exist');
        }
        const picturesUrls: PictureDto[] = await this.leaseInspectionStepPictureService.getPicturesUrl(leaseInspectionStepId);
        return LeaseInspectionStepDtoMapper.fromModelWithLink(leaseInspectionStep, picturesUrls);
    }

    async update(leaseInspectionStepId: string, leaseInspectionStepDto: LeaseInspectionStepWithFileDto): Promise<LeaseInspectionStepWithLinkDto> {
        leaseInspectionStepDto.id = leaseInspectionStepId;
        const leaseInspection = await this.leaseInspectionRepository.findById(leaseInspectionStepDto.leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('Lease inspection does not exist');
        }
        const element = await this.elementRepository.findById(leaseInspectionStepDto.elementId);
        if (!element) {
            throw new NotFoundException('Element does not exist');
        }
        const pictures = isArray(leaseInspectionStepDto.pictures) ? leaseInspectionStepDto.pictures : [leaseInspectionStepDto.pictures];
        const leaseInspectionStepUpdated = LeaseInspectionStepDtoMapper.toModel(leaseInspectionStepDto, leaseInspection, element);
        for (const picture of pictures) {
            await this.leaseInspectionStepPictureService.create(leaseInspectionStepUpdated, picture);
        }
        const picturesUrl: PictureDto[] = await this.leaseInspectionStepPictureService.getPicturesUrl(leaseInspectionStepId); 
        return LeaseInspectionStepDtoMapper.fromModelWithLink(await this.repository.updateElement(leaseInspectionStepUpdated), picturesUrl);
    }

    async deletePicturesByPictureId(PicturesId : string) {
        return await this.leaseInspectionStepPictureService.delete(PicturesId);
    }

}
