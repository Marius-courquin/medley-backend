import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Window } from "@domain/entities/window.entity";
import { SubElement } from "@domain/entities/subElement.entity";
import { SubElementRepository } from "@domain/repositories/subElement.repository";
import { WindowDtoMapper } from '@infrastructure/mappers/window.dto.mapper';
import { WindowDto } from '@infrastructure/dtos/window.dto';
import { WindowRepository } from '@domain/repositories/window.repository';
import { SubElementType } from '@domain/entities/enum/subElement.enum.entity';

@Injectable()
export class WindowService {
    constructor(
        private readonly repository: WindowRepository,
        private readonly subElementRepository: SubElementRepository,
    ) {}

    async create(windowDto: WindowDto): Promise<WindowDto> {
        const subElement : SubElement = await this.subElementRepository.findById(windowDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('sub element does not exist');
        }
        if (subElement.type !== SubElementType.WINDOW ) {
            throw new BadRequestException('sub element is not a Window');
        }

        const window : Window = WindowDtoMapper.toModel(windowDto, subElement);
        return WindowDtoMapper.fromModel(await this.repository.save(window));
    }

    async get(id: string): Promise<WindowDto> {
        const window : Window = await this.repository.findById(id);
        if (!window) {
            throw new NotFoundException( 'window does not exist');
        }

        return WindowDtoMapper.fromModel(window);
    }

    async update(id: string, windowDto: WindowDto): Promise<WindowDto> {
        const subElement : SubElement = await this.subElementRepository.findById(windowDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('sub element does not exist');
        }
        if (subElement.type !== SubElementType.WINDOW ) {
            throw new BadRequestException('sub element is not a Window');
        }
        windowDto.id = id;
        const window : Window = WindowDtoMapper.toModel(windowDto, subElement);
        return WindowDtoMapper.fromModel( await this.repository.updateElement(window));
    }

    async getBySubElement(subElementId: string): Promise<WindowDto> {
        const window : Window = await this.repository.findBySubElement(subElementId);
        if (!window) {
            throw new NotFoundException('no window found for this subElement');
        }

        return WindowDtoMapper.fromModel(window);
    }
    
}
