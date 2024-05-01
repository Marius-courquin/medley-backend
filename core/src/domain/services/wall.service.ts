import { Injectable, NotFoundException } from '@nestjs/common';
import { ElementRepository } from "@domain/repositories/element.repository";
import { WallDtoMapper } from '@infrastructure/mappers/wall.dto.mapper';
import { WallDto } from '@infrastructure/dtos/wall.dto';
import { Element } from '@domain/entities/element.entity';
import { WallRepository } from '@domain/repositories/wall.repository';
import { Wall } from '@domain/entities/wall.entity';
import { ElementType } from '@domain/entities/enum/element.enum.entity';

@Injectable()
export class WallService {
    constructor(
        private readonly repository: WallRepository,
        private readonly elementRepository: ElementRepository
    ) {}

    async createWall(wallDto: WallDto): Promise<WallDto> {
        const element : Element = await this.elementRepository.findById(wallDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }
        if(element.type !== ElementType.WALL) {
            throw new NotFoundException('element is not a wall');
        }

        const wall : Wall = WallDtoMapper.toModel(wallDto, element);
        return WallDtoMapper.fromModel(await this.repository.save(wall));
    }

    async getWall(id: string): Promise<WallDto> {
        const wall : Wall = await this.repository.findById(id);
        if (!wall) {
            throw new NotFoundException( 'wall does not exist');
        }

        return WallDtoMapper.fromModel(wall);
    }

    async updateWall(id: string, wallDto: WallDto): Promise<WallDto> {
        const element : Element = await this.elementRepository.findById(wallDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }

        wallDto.id = id;
        const wall : Wall = WallDtoMapper.toModel(wallDto, element);
        return WallDtoMapper.fromModel( await this.repository.updateWall(wall));
    }

    async findWallByElement(elementId: string): Promise<WallDto> {
        const wall : Wall = await this.repository.findByElement(elementId);
        if (!wall) {
            throw new NotFoundException('no wall found for this element');
        }

        return WallDtoMapper.fromModel(wall);
    }

}
