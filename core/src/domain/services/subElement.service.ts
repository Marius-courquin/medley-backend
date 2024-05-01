import { Injectable, NotFoundException } from '@nestjs/common';
import { SubElement } from "@domain/entities/subElement.entity";
import { Element } from "@domain/entities/element.entity";
import { SubElementRepository } from "@domain/repositories/subElement.repository";
import { SubElementDtoMapper } from '@infrastructure/mappers/subElement.dto.mapper';
import { SubElementDto } from '@/infrastructure/dtos/subElement.dto';
import { ElementRepository } from '@domain/repositories/element.repository';
import { WallSocketRepository } from '@domain/repositories/wallSocket.repository';
import { WallSocketDto } from '@/infrastructure/dtos/wallSocket.dto';
import { WallSocketDtoMapper } from '@infrastructure/mappers/wallSocket.dto.mapper';
import { GenericSubElementRepository } from '@domain/repositories/genericSubElement.repository';
import { GenericSubElementDto } from '@/infrastructure/dtos/genericSubElement.dto';
import { GenericSubElementDtoMapper } from '@infrastructure/mappers/genericSubElement.dto.mapper';
import { WindowRepository } from '@domain/repositories/window.repository';
import { WindowDto } from '@/infrastructure/dtos/window.dto';
import { WindowDtoMapper } from '@infrastructure/mappers/window.dto.mapper';

@Injectable()
export class SubElementService {
    constructor(
        private readonly repository: SubElementRepository,
        private readonly elementRepository: ElementRepository,
        private readonly wallSocketRepository: WallSocketRepository,
        private readonly genericSubElementRepository: GenericSubElementRepository,
        private readonly windowRepository: WindowRepository
    ) {}

    async createSubElement(subElementDto: SubElementDto): Promise<SubElementDto> {
        const element : Element = await this.elementRepository.findById(subElementDto.elementId);
        if (!element) {
            throw new NotFoundException('Element does not exist');
        }

        const subElement : SubElement = SubElementDtoMapper.toModel(subElementDto, element);
        return SubElementDtoMapper.fromModel(await this.repository.save(subElement));
    }

    async getSubElement(id: string): Promise<SubElementDto> {
        const subElement : SubElement = await this.repository.findById(id);
        if (!SubElement) {
            throw new NotFoundException( 'SubElement does not exist');
        }

        return SubElementDtoMapper.fromModel(subElement);
    }

    async updateSubElement(id: string, subElementDto: SubElementDto): Promise<SubElementDto> {
        const element : Element = await this.elementRepository.findById(subElementDto.elementId);
        if (!element) {
            throw new NotFoundException('Element does not exist');
        }

        subElementDto.id = id;
        const subElement : SubElement = SubElementDtoMapper.toModel(subElementDto, element);
        return SubElementDtoMapper.fromModel( await this.repository.updateSubElement(subElement));
    }

    async findSubElementsByElement(elementId: string): Promise<SubElementDto[]> {
        const subElement : SubElement[] = await this.repository.findByElement(elementId);
        if (subElement.length === 0) {
            throw new NotFoundException('no subElement found for this element');
        }

        return subElement.map(SubElementDtoMapper.fromModel);
    }

    async getRelatedEntity(id: string): Promise< WallSocketDto | GenericSubElementDto  | WindowDto > {
        const subElement : SubElement = await this.repository.findById(id);
        if (!subElement) {
            throw new NotFoundException('SubElement does not exist');
        }
        switch (subElement.type) {
            case 'WALL_SOCKET':
                return WallSocketDtoMapper.fromModel(await this.wallSocketRepository.findBySubElement(id));
            case 'GENERIC_SUB_ELEMENT':
                return GenericSubElementDtoMapper.fromModel(await this.genericSubElementRepository.findBySubElement(id));
            case 'WINDOW':
                return WindowDtoMapper.fromModel(await this.windowRepository.findBySubElement(id));
            default:
                throw new NotFoundException('SubElement type not found');
        }
    }

}
