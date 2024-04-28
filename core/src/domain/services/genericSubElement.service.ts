import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericSubElement } from "@domain/entities/genericSubElement.entity";
import { SubElement } from "@domain/entities/subElement.entity";
import { SubElementRepository } from "@domain/repositories/subElement.repository";
import { GenericElementDtoMapper } from '@infrastructure/mappers/genericSubElement.dto.mapper';
import { GenericSubElementDto } from '@infrastructure/dtos/genericSubElement.dto';
import { GenericSubElementRepository } from '@domain/repositories/genericSubElement.repository';

@Injectable()
export class GenericSubElementService {
    constructor(
        private readonly repository: GenericSubElementRepository,
        private readonly subElementRepository: SubElementRepository,
    ) {}

    async createGenericSubElement(GenericSubElementDto: GenericSubElementDto): Promise<GenericSubElementDto> {
        const subElement : SubElement = await this.subElementRepository.findById(GenericSubElementDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('subElement does not exist');
        }
        const genericSubElement : GenericSubElement = GenericElementDtoMapper.toModel(GenericSubElementDto, subElement);
        return GenericElementDtoMapper.fromModel(await this.repository.save(genericSubElement));
    }

    async getGenericSubElement(id: string): Promise<GenericSubElementDto> {
        const genericSubElement : GenericSubElement = await this.repository.findById(id);
        if (!genericSubElement) {
            throw new NotFoundException( 'GenericSubElement does not exist');
        }

        return GenericElementDtoMapper.fromModel(genericSubElement);
    }

    async updateGenericSubElement(id: string, genericSubElementDto: GenericSubElementDto): Promise<GenericSubElementDto> {
        const subElement : SubElement = await this.subElementRepository.findById(genericSubElementDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('subElement does not exist');
        }

        genericSubElementDto.id = id;
        const genericSubElement : GenericSubElement = GenericElementDtoMapper.toModel(genericSubElementDto, subElement);
        return GenericElementDtoMapper.fromModel( await this.repository.updateGenericSubElement(genericSubElement));
    }

    async findGenericSubElementBySubElement(subElementId: string): Promise<GenericSubElementDto> {
        const genericSubElement : GenericSubElement = await this.repository.findBySubElement(subElementId);
        if (!genericSubElement) {
            throw new NotFoundException('no genericSubElement found for this subElement');
        }

        return GenericElementDtoMapper.fromModel(genericSubElement);
    }
    
}
