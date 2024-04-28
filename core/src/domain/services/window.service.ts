import { Injectable, NotFoundException } from '@nestjs/common';
import { Window } from "@domain/entities/window.entity";
import { SubElement } from "@domain/entities/subElement.entity";
import { SubElementRepository } from "@domain/repositories/subElement.repository";
import { WindowDtoMapper } from '@infrastructure/mappers/window.dto.mapper';
import { WindowDto } from '@infrastructure/dtos/window.dto';
import { WindowRepository } from '@domain/repositories/window.repository';

@Injectable()
export class WallSocketService {
    constructor(
        private readonly repository: WindowRepository,
        private readonly subElementRepository: SubElementRepository,
    ) {}

    async createWindow(windowDto: WindowDto): Promise<WindowDto> {
        const subElement : SubElement = await this.subElementRepository.findById(windowDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('subElement does not exist');
        }

        const window : Window = WindowDtoMapper.toModel(windowDto, subElement);
        return WindowDtoMapper.fromModel(await this.repository.save(window));
    }

    async getWindow(id: string): Promise<WindowDto> {
        const window : Window = await this.repository.findById(id);
        if (!window) {
            throw new NotFoundException( 'Window does not exist');
        }

        return WindowDtoMapper.fromModel(window);
    }

    async updateWindow(id: string, windowDto: WindowDto): Promise<WindowDto> {
        const subElement : SubElement = await this.subElementRepository.findById(windowDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('Wall does not exist');
        }

        windowDto.id = id;
        const window : Window = WindowDtoMapper.toModel(windowDto, subElement);
        return WindowDtoMapper.fromModel( await this.repository.updateWindow(window));
    }

    async findWindowBySubElement(subElementId: string): Promise<WindowDto> {
        const window : Window = await this.repository.findBySubElement(subElementId);
        if (!window) {
            throw new NotFoundException('no window found for this subElement');
        }

        return WindowDtoMapper.fromModel(window);
    }
    
}
