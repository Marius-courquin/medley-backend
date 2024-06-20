import {Injectable, NotFoundException} from '@nestjs/common';
import {LeaseInspectionStepRepository} from '@domain/repositories/leaseInspectionStep.repository';
import {LeaseInspectionSubStepWithLinkDto} from '@infrastructure/dtos/leaseInspectionSubStepWithLink.dto';
import {LeaseInspectionSubStepDtoMapper} from '@infrastructure/mappers/leaseInspectionSubStep.dto.mapper';
import {LeaseInspectionSubStepWithFileDto} from '@infrastructure/dtos/leaseInspectionSubStepWithFile.dto';
import {PictureDto} from '@infrastructure/dtos/picture.dto';
import {isArray} from 'class-validator';
import {LeaseInspectionSubStepPictureService} from '@domain/services/leaseInspectionSubStepPicture.service';
import {LeaseInspectionSubStepRepository} from '@domain/repositories/leaseInspectionSubStep.repository';
import {LeaseInspectionSubStep} from '@domain/entities/leaseInspectionSubStep.entity';
import {SubElementRepository} from '@domain/repositories/subElement.repository';
import {SubElementService} from "@domain/services/subElement.service";
import {WallSocketDto} from "@infrastructure/dtos/wallSocket.dto";
import {
    LeaseInspectionContextGenericDto,
    LeaseInspectionContextWallSocketDto,
    LeaseInspectionContextWindowDto
} from "@infrastructure/dtos/leaseInspectionContextDto";
import {GenericSubElementDto} from "@infrastructure/dtos/genericSubElement.dto";
import {WindowDto} from "@infrastructure/dtos/window.dto";
import {SubElementType} from "@domain/entities/enum/subElement.enum.entity";
import {LeaseInspectionSubStepState} from "@domain/entities/enum/leaseInspectionSubStep.enum.entity";


@Injectable()
export class LeaseInspectionSubStepService {
    constructor(
        private readonly repository: LeaseInspectionSubStepRepository,
        private readonly leaseInspectionSubStepPictureService: LeaseInspectionSubStepPictureService,
        private readonly leaseInspectionStepRepository: LeaseInspectionStepRepository,
        private readonly subElementRepository: SubElementRepository,
        private readonly subElementService: SubElementService
    ) {
    }

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
        
        if (!leaseInspectionSubStepDto.pictures){
            return LeaseInspectionSubStepDtoMapper.fromModelWithLink(leaseInspectionSubStep, undefined);
        }

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

        const leaseInspectionSubStepUpdated = LeaseInspectionSubStepDtoMapper.toModel(leaseInspectionSubStepDto, leaseInspectionStep, subElement);
        this.updateState(leaseInspectionSubStepUpdated);
        
        if (!leaseInspectionSubStepDto.pictures){
            return LeaseInspectionSubStepDtoMapper.fromModelWithLink(await this.repository.updateElement(leaseInspectionSubStepUpdated), undefined);
        }
        
        const pictures = isArray(leaseInspectionSubStepDto.pictures) ? leaseInspectionSubStepDto.pictures : [leaseInspectionSubStepDto.pictures];

        for (const picture of pictures) {
            await this.leaseInspectionSubStepPictureService.create(leaseInspectionSubStepUpdated, picture);
        }
        const picturesUrl: PictureDto[] = await this.leaseInspectionSubStepPictureService.getPicturesUrl(leaseInspectionSubStepId);
        return LeaseInspectionSubStepDtoMapper.fromModelWithLink(await this.repository.updateElement(leaseInspectionSubStepUpdated), picturesUrl);
    }

    async deletePicturesByPictureId(PicturesId: string) {
        return await this.leaseInspectionSubStepPictureService.delete(PicturesId);
    }

    async getContext(leaseInspectionSubStep: LeaseInspectionSubStep) {
        const picturesUrls: PictureDto[] = await this.leaseInspectionSubStepPictureService.getPicturesUrl(leaseInspectionSubStep.id);
        const leaseInspectionStepDto = LeaseInspectionSubStepDtoMapper.fromModelWithLink(leaseInspectionSubStep, picturesUrls);

        const relatedSubElement = await this.subElementService.getRelatedEntity(leaseInspectionSubStep.subElement.id);

        switch (leaseInspectionSubStep.subElement.type) {
            case SubElementType.WALL_SOCKET:
                 const wallSocket = relatedSubElement as WallSocketDto;
                 return new LeaseInspectionContextWallSocketDto(leaseInspectionStepDto, wallSocket);
            case SubElementType.GENERIC_SUB_ELEMENT:
                const generic = relatedSubElement as GenericSubElementDto;
                return new LeaseInspectionContextGenericDto(leaseInspectionStepDto, generic);
            case SubElementType.WINDOW:
                const window = relatedSubElement as WindowDto;
                return new LeaseInspectionContextWindowDto(leaseInspectionStepDto, window);
        }

    }

    updateState(leaseInspectionSubStep: LeaseInspectionSubStep) {
        switch (leaseInspectionSubStep.state) {
            case LeaseInspectionSubStepState.PENDING:
                if (leaseInspectionSubStep.rating != null  && leaseInspectionSubStep.rating >= 0) {
                    leaseInspectionSubStep.state = LeaseInspectionSubStepState.DONE;
                } else {
                    leaseInspectionSubStep.state = LeaseInspectionSubStepState.IN_PROGRESS;
                }
                break;
            case LeaseInspectionSubStepState.IN_PROGRESS:
                if (leaseInspectionSubStep.rating != null && leaseInspectionSubStep.rating >= 0) {
                    leaseInspectionSubStep.state = LeaseInspectionSubStepState.DONE;
                }
                break;
            default:
                break;
        }
    }

}
