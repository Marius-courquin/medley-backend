import { Injectable, NotFoundException } from '@nestjs/common';
import { WallSocket } from "@domain/entities/wallSocket.entity";
import { SubElement } from "@domain/entities/subElement.entity";
import { SubElementRepository } from "@domain/repositories/subElement.repository";
import { WallSocketDtoMapper } from '@infrastructure/mappers/wallSocket.dto.mapper';
import { WallSocketDto } from '@infrastructure/dtos/wallSocket.dto';
import { WallSocketRepository } from '@domain/repositories/wallSocket.repository';

@Injectable()
export class WallSocketService {
    constructor(
        private readonly repository: WallSocketRepository,
        private readonly subElementRepository: SubElementRepository,
    ) {}

    async createWallSocket(wallSocketDto: WallSocketDto): Promise<WallSocketDto> {
        const subElement : SubElement = await this.subElementRepository.findById(wallSocketDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('subElement does not exist');
        }

        const wallSocket : WallSocket = WallSocketDtoMapper.toModel(wallSocketDto, subElement);
        return WallSocketDtoMapper.fromModel(await this.repository.save(wallSocket));
    }

    async getWallSocket(id: string): Promise<WallSocketDto> {
        const wallSocket : WallSocket = await this.repository.findById(id);
        if (!wallSocket) {
            throw new NotFoundException( 'WallSocket does not exist');
        }

        return WallSocketDtoMapper.fromModel(wallSocket);
    }

    async updateWallSocket(id: string, wallSocketDto: WallSocketDto): Promise<WallSocketDto> {
        const subElement : SubElement = await this.subElementRepository.findById(wallSocketDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('Wall does not exist');
        }

        wallSocketDto.id = id;
        const wallSocket : WallSocket = WallSocketDtoMapper.toModel(wallSocketDto, subElement);
        return WallSocketDtoMapper.fromModel( await this.repository.updateWallSocket(wallSocket));
    }

    async findWallSocketBySubElement(subElementId: string): Promise<WallSocketDto> {
        const wallSocket : WallSocket = await this.repository.findBySubElement(subElementId);
        if (!wallSocket) {
            throw new NotFoundException('no wallSocket found for this subElement');
        }

        return WallSocketDtoMapper.fromModel(wallSocket);
    }
    
}
