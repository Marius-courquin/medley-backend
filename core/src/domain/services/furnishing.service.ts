import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Furnishing } from "@domain/entities/furnishing.entity";
import { FurnishingRepository } from "@domain/repositories/furnishing.repository";
import { FurnishingDtoMapper  } from '@infrastructure/mappers/furnishing.dto.mapper';
import { Element } from '@domain/entities/element.entity';
import { ElementRepository } from '@domain/repositories/element.repository';
import { FurnishingWithLinkDto } from '@infrastructure/dtos/furnishingWithLink.dto';
import { FurnishingWithFileDto } from '@infrastructure/dtos/furnishingWithFile.dto';

import { ElementType } from '@domain/entities/enum/element.enum.entity';
import { FurnishingPictureService } from '@domain/services/furnishingPicture.service';

@Injectable()
export class FurnishingService {
    constructor(
        private readonly repository: FurnishingRepository,
        private readonly furnishingPictureService: FurnishingPictureService,
        private readonly elementRepository: ElementRepository
    ) {}

    async create(furnishingDto: FurnishingWithFileDto): Promise<FurnishingWithLinkDto> {
        const element : Element = await this.elementRepository.findById(furnishingDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }
        if(element.type !== ElementType.FURNISHING) {
            throw new BadRequestException('element is not a furnishing');
        }
        
        const furnishing : Furnishing = await this.repository.save(FurnishingDtoMapper.toModel(furnishingDto, element));
        await this.furnishingPictureService.create(furnishing, furnishingDto.picture);

        const picturesUrl = await this.furnishingPictureService.getPicturesUrl(furnishing.id);
        return FurnishingDtoMapper.fromModelWithLink(furnishing, picturesUrl);
    }

    async get(id: string): Promise<FurnishingWithLinkDto> {
        const furnishing : Furnishing = await this.repository.findById(id);
        if (!furnishing) {
            throw new NotFoundException( 'furnishing does not exist');
        }

        const pictureUrl = await this.furnishingPictureService.getPicturesUrl(furnishing.id);
        return FurnishingDtoMapper.fromModelWithLink(furnishing, pictureUrl);
    }

    async getFurnishingByElement(elementId: string): Promise<FurnishingWithLinkDto> {
        const furnishing : Furnishing = await this.repository.findByElement(elementId);
        if (!furnishing) {
            throw new NotFoundException('no furnishing found for this element');
        }

        const picturesUrl = await this.furnishingPictureService.getPicturesUrl(furnishing.id);
        return FurnishingDtoMapper.fromModelWithLink(furnishing, picturesUrl);
    }

}
