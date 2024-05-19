import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { WallSocket } from "@domain/entities/wallSocket.entity";
import { SubElement } from "@domain/entities/subElement.entity";
import { SubElementRepository } from "@domain/repositories/subElement.repository";
import { WallSocketDtoMapper } from '@infrastructure/mappers/wallSocket.dto.mapper';
import { WallSocketDto } from '@infrastructure/dtos/wallSocket.dto';
import { WallSocketRepository } from '@domain/repositories/wallSocket.repository';
import { SubElementType } from '@domain/entities/enum/subElement.enum.entity';

@Injectable()
export class WallSocketService {
    constructor(
        private readonly repository: WallSocketRepository,
        private readonly subElementRepository: SubElementRepository,
    ) {}

    async create(wallSocketDto: WallSocketDto): Promise<WallSocketDto> {
        const subElement : SubElement = await this.subElementRepository.findById(wallSocketDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('sub element does not exist');
        }
        if (subElement.type !== SubElementType.WALL_SOCKET ) {
            throw new BadRequestException('sub element is not a WallSocket');
        }

        const wallSocket : WallSocket = WallSocketDtoMapper.toModel(wallSocketDto, subElement);
        return WallSocketDtoMapper.fromModel(await this.repository.save(wallSocket));
    }

    async get(id: string): Promise<WallSocketDto> {
        const wallSocket : WallSocket = await this.repository.findById(id);
        if (!wallSocket) {
            throw new NotFoundException( 'wall socket does not exist');
        }

        return WallSocketDtoMapper.fromModel(wallSocket);
    }

    async update(id: string, wallSocketDto: WallSocketDto): Promise<WallSocketDto> {
        const subElement : SubElement = await this.subElementRepository.findById(wallSocketDto.subElementId);
        if (!subElement) {
            throw new NotFoundException('sub element does not exist');
        }
        if (subElement.type !== SubElementType.WALL_SOCKET ) {
            throw new BadRequestException('sub element is not a WallSocket');
        }
        wallSocketDto.id = id;
        const wallSocket : WallSocket = WallSocketDtoMapper.toModel(wallSocketDto, subElement);
        return WallSocketDtoMapper.fromModel( await this.repository.updateElement(wallSocket));
    }

    async getBySubElement(subElementId: string): Promise<WallSocketDto> {
        const wallSocket : WallSocket = await this.repository.findBySubElement(subElementId);
        if (!wallSocket) {
            throw new NotFoundException('no wall socket found for this subElement');
        }

        return WallSocketDtoMapper.fromModel(wallSocket);
    }
    
}
