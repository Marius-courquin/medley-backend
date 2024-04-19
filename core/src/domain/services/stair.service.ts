import { Injectable, NotFoundException } from '@nestjs/common';
import { Stair } from "@domain/entities/Stair.entity";
import { StairRepository } from "@domain/repositories/stair.repository";
import { StairDtoMapper } from '@infrastructure/mappers/stair.dto.mapper';
import { StairDto } from '@infrastructure/dtos/Stair.dto';
import { Element } from '@domain/entities/element.entity';
import { ElementRepository } from '@domain/repositories/element.repository';


@Injectable()
export class StairService {
    constructor(
        private readonly repository: StairRepository,
        private readonly elementRepository: ElementRepository
    ) {}

    async createStair(stairDto: StairDto): Promise<StairDto> {
        const element : Element = await this.elementRepository.findById(stairDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }

        const Stair : Stair = StairDtoMapper.toModel(stairDto, element);
        return StairDtoMapper.fromModel(await this.repository.save(Stair));
    }

    async getStair(id: string): Promise<StairDto> {
        const Stair : Stair = await this.repository.findById(id);
        if (!Stair) {
            throw new NotFoundException( 'Stair does not exist');
        }

        return StairDtoMapper.fromModel(Stair);
    }

    async updateStair(id: string, stairDto: StairDto): Promise<StairDto> {
        const element : Element = await this.elementRepository.findById(stairDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }

        stairDto.id = id;
        const Stair : Stair = StairDtoMapper.toModel(stairDto, element);
        return StairDtoMapper.fromModel( await this.repository.updateStair(Stair));
    }

    async findStairByElement(elementId: string): Promise<StairDto[]> {
        let stairs : Stair[] = await this.repository.findByElement(elementId);
        if (stairs.length === 0) {
            throw new NotFoundException('no Stairs found for this element');
        }

        return stairs.map(stair => StairDtoMapper.fromModel(stair));
    }

}
