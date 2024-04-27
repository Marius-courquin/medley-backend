import { Injectable, NotFoundException } from '@nestjs/common';
import { Furnishing } from "@domain/entities/furnishing.entity";
import { FurnishingRepository } from "@domain/repositories/furnishing.repository";
import { FurnishingDtoMapper  } from '@infrastructure/mappers/furnishing.dto.mapper';
import { Element } from '@domain/entities/element.entity';
import { ElementRepository } from '@domain/repositories/element.repository';
import { FurnishingDto } from '@infrastructure/dtos/furninshing.dto';


@Injectable()
export class FurnishingService {
    constructor(
        private readonly repository: FurnishingRepository,
        private readonly elementRepository: ElementRepository
    ) {}

    async createFurnishing(furnishingDto: FurnishingDto): Promise<FurnishingDto> {
        const element : Element = await this.elementRepository.findById(furnishingDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }
        if(element.type !== 'FURNISHING') {
            throw new NotFoundException('element is not a furnishing');
        }
        const furnishing : Furnishing = FurnishingDtoMapper.toModel(furnishingDto, element);
        return FurnishingDtoMapper.fromModel(await this.repository.save(furnishing));
    }

    async getFurnishing(id: string): Promise<FurnishingDto> {
        const furnishing : Furnishing = await this.repository.findById(id);
        if (!furnishing) {
            throw new NotFoundException( 'Stair does not exist');
        }

        return FurnishingDtoMapper.fromModel(furnishing);
    }

    async updateFurnishing(id: string, furnishingDto: FurnishingDto): Promise<FurnishingDto> {
        const element : Element = await this.elementRepository.findById(furnishingDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }

        furnishingDto.id = id;
        const furnishing : Furnishing = FurnishingDtoMapper.toModel(furnishingDto, element);
        return FurnishingDtoMapper.fromModel( await this.repository.updateFurnishing(furnishing));
    }

    async findFurnishingByElement(elementId: string): Promise<FurnishingDto> {
        const furnishing : Furnishing = await this.repository.findByElement(elementId);
        if (!furnishing) {
            throw new NotFoundException('no furnishing found for this element');
        }

        return FurnishingDtoMapper.fromModel(furnishing);
    }

}
