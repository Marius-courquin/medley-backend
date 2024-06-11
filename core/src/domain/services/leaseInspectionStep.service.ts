import {Injectable, NotFoundException} from '@nestjs/common';
import {LeaseInspectionStep} from '@domain/entities/leaseInspectionStep.entity';
import {LeaseInspectionStepRepository} from '@domain/repositories/leaseInspectionStep.repository';
import {LeaseInspectionStepWithLinkDto} from '@infrastructure/dtos/leaseInspectionStepWithLink.dto';
import {LeaseInspectionStepDtoMapper} from '@infrastructure/mappers/leaseInspectionStep.dto.mapper';
import {LeaseInspectionRepository} from '@domain/repositories/leaseInspection.repository';
import {LeaseInspectionStepWithFileDto} from '@infrastructure/dtos/leaseInspectionStepWithFile.dto';
import {LeaseInspectionStepPictureService} from '@domain/services/leaseInspectionStepPicture.service';
import {PictureDto} from '@infrastructure/dtos/picture.dto';
import {isArray} from 'class-validator';
import {ElementRepository} from '@domain/repositories/element.repository';
import {ElementService} from "@domain/services/element.service";
import {ElementTypeDto} from "@infrastructure/dtos/enum/element.enum.dto";
import {WallDto} from "@infrastructure/dtos/wall.dto";
import {
    LeaseInspectionContextCeilingDto,
    LeaseInspectionContextGenericDto,
    LeaseInspectionContextGroundDto,
    LeaseInspectionContextWallDto,
    LeaseInspectionContextWallSocketDto,
    LeaseInspectionContextWindowDto
} from "@infrastructure/dtos/leaseInspectionContextDto";
import {CeilingDto} from "@infrastructure/dtos/ceiling.dto";
import {SubElementType} from "@domain/entities/enum/subElement.enum.entity";
import {LeaseInspectionSubStepService} from "@domain/services/leaseInspectionSubStep.service";
import {LeaseInspectionSubStepRepository} from "@domain/repositories/leaseInspectionSubStep.repository";
import {GroundDto} from "@infrastructure/dtos/ground.dto";

@Injectable()
export class LeaseInspectionStepService {
    constructor(
        private readonly repository: LeaseInspectionStepRepository,
        private readonly leaseInspectionStepPictureService: LeaseInspectionStepPictureService,
        private readonly leaseInspectionRepository: LeaseInspectionRepository,
        private readonly elementRepository: ElementRepository,
        private readonly elementService: ElementService,
        private readonly leaseInspectionSubStepRepository: LeaseInspectionSubStepRepository,
        private readonly leaseInspectionSubStepService: LeaseInspectionSubStepService
    ) {
    }

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
            await this.leaseInspectionStepPictureService.create(leaseInspectionStep, leaseInspection.id, picture);
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
            await this.leaseInspectionStepPictureService.create(leaseInspectionStepUpdated, leaseInspection.id, picture);
        }
        const picturesUrl: PictureDto[] = await this.leaseInspectionStepPictureService.getPicturesUrl(leaseInspectionStepId);
        return LeaseInspectionStepDtoMapper.fromModelWithLink(await this.repository.updateElement(leaseInspectionStepUpdated), picturesUrl);
    }

    async deletePicturesByPictureId(PicturesId: string) {
        return await this.leaseInspectionStepPictureService.delete(PicturesId);
    }

    async getRelatedSubStepContext(leaseInspectionStep: LeaseInspectionStep, subElementType: SubElementType) {
        const leaseInspectionSubSteps = await this.leaseInspectionSubStepRepository.findByLeaseInspectionStepAndSubElementType(leaseInspectionStep.id, subElementType);
        const leaseInspectionsSubStepContexts = [];
        for (const leaseInspectionSubStep of leaseInspectionSubSteps) {
            leaseInspectionsSubStepContexts.push(await this.leaseInspectionSubStepService.getContext(leaseInspectionSubStep));
        }
        return leaseInspectionsSubStepContexts;
    }

    async getContext(leaseInspectionStep: LeaseInspectionStep) {
        const picturesUrls: PictureDto[] = await this.leaseInspectionStepPictureService.getPicturesUrl(leaseInspectionStep.id);
        const leaseInspectionStepDto = LeaseInspectionStepDtoMapper.fromModelWithLink(leaseInspectionStep, picturesUrls);

        const relatedElement = await this.elementService.getRelatedEntity(leaseInspectionStepDto.element.id)

        let wallSockets = [], windows = [], generics = [];
        if (ElementTypeDto.WALL === leaseInspectionStepDto.element.type || ElementTypeDto.CEILING === leaseInspectionStepDto.element.type) {
            wallSockets = await this.getRelatedSubStepContext(leaseInspectionStep, SubElementType.WALL_SOCKET) as LeaseInspectionContextWallSocketDto[];
            windows = await this.getRelatedSubStepContext(leaseInspectionStep, SubElementType.WINDOW) as LeaseInspectionContextWindowDto[];
            generics = await this.getRelatedSubStepContext(leaseInspectionStep, SubElementType.GENERIC_SUB_ELEMENT) as LeaseInspectionContextGenericDto[];

            wallSockets = wallSockets.sort((a, b) => a.subElement.order - b.subElement.order)
            windows = windows.sort((a, b) => a.subElement.order - b.subElement.order)
            generics = generics.sort((a, b) => a.subElement.order - b.subElement.order)
        }

        switch (leaseInspectionStepDto.element.type) {
            case ElementTypeDto.WALL:
                const wall = relatedElement as WallDto;
                return new LeaseInspectionContextWallDto(leaseInspectionStepDto, wall, wallSockets, windows, generics);
            case ElementTypeDto.CEILING:
                const ceiling = relatedElement as CeilingDto;
                return new LeaseInspectionContextCeilingDto(leaseInspectionStepDto, ceiling, wallSockets, windows, generics);
            case ElementTypeDto.GROUND:
                const ground = relatedElement as GroundDto;
                return new LeaseInspectionContextGroundDto(leaseInspectionStepDto, ground);
            case ElementTypeDto.STAIR:
                const stair = relatedElement as GroundDto;
                return new LeaseInspectionContextGroundDto(leaseInspectionStepDto, stair);
            case ElementTypeDto.FURNISHING:
                const furnishing = relatedElement as GroundDto;
                return new LeaseInspectionContextGroundDto(leaseInspectionStepDto, furnishing);
        }

    }

}
