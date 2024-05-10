import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { GenericSubElement } from "@domain/entities/genericSubElement.entity";
import { SubElement } from "@domain/entities/subElement.entity";
import { SubElementRepository } from "@domain/repositories/subElement.repository";
import { GenericSubElementDtoMapper } from '@infrastructure/mappers/genericSubElement.dto.mapper';
import { GenericSubElementDto } from '@infrastructure/dtos/genericSubElement.dto';
import { GenericSubElementRepository } from '@domain/repositories/genericSubElement.repository';
import { SubElementType } from '@domain/entities/enum/subElement.enum.entity';
@Injectable()
export class GenericSubElementService {
    constructor(
        private readonly repository: GenericSubElementRepository,
        private readonly subElementRepository: SubElementRepository,
    ) {}

    async create(GenericSubElementDto: GenericSubElementDto): Promise<GenericSubElementDto> {
        const subElement : SubElement = await this.subElementRepository.findById(GenericSubElementDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('subElement does not exist');
        }
        if (subElement.type !== SubElementType.GENERIC_SUB_ELEMENT ) {
            throw new BadRequestException('subElement is not a generic sub element');
        }
        const genericSubElement : GenericSubElement = GenericSubElementDtoMapper.toModel(GenericSubElementDto, subElement);
        return GenericSubElementDtoMapper.fromModel(await this.repository.save(genericSubElement));
    }

    async get(id: string): Promise<GenericSubElementDto> {
        const genericSubElement : GenericSubElement = await this.repository.findById(id);
        if (!genericSubElement) {
            throw new NotFoundException( 'genericSubElement does not exist');
        }

        return GenericSubElementDtoMapper.fromModel(genericSubElement);
    }

    async update(id: string, genericSubElementDto: GenericSubElementDto): Promise<GenericSubElementDto> {
        const subElement : SubElement = await this.subElementRepository.findById(genericSubElementDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('subElement does not exist');
        }
        if (subElement.type !== SubElementType.GENERIC_SUB_ELEMENT ) {
            throw new BadRequestException('subElement is not a generic sub element');
        }

        genericSubElementDto.id = id;
        const genericSubElement : GenericSubElement = GenericSubElementDtoMapper.toModel(genericSubElementDto, subElement);
        return GenericSubElementDtoMapper.fromModel( await this.repository.updateElement(genericSubElement));
    }

    async getBySubElement(subElementId: string): Promise<GenericSubElementDto> {
        const genericSubElement : GenericSubElement = await this.repository.findBySubElement(subElementId);
        if (!genericSubElement) {
            throw new NotFoundException('no genericSubElement found for this subElement');
        }

        return GenericSubElementDtoMapper.fromModel(genericSubElement);
    }
    
}
