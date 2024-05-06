import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Stair } from "@domain/entities/stair.entity";
import { StairRepository } from "@domain/repositories/stair.repository";
import { StairDtoMapper } from '@infrastructure/mappers/stair.dto.mapper';
import { StairDto } from '@infrastructure/dtos/stair.dto';
import { Element } from '@domain/entities/element.entity';
import { ElementRepository } from '@domain/repositories/element.repository';
import { ElementType } from '@domain/entities/enum/element.enum.entity';

@Injectable()
export class StairService {
    constructor(
        private readonly repository: StairRepository,
        private readonly elementRepository: ElementRepository
    ) {}

    async create(stairDto: StairDto): Promise<StairDto> {
        const element : Element = await this.elementRepository.findById(stairDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }
        if(element.type !== ElementType.STAIR) {
            throw new BadRequestException('element is not a stair');
        }
        
        const Stair : Stair = StairDtoMapper.toModel(stairDto, element);
        return StairDtoMapper.fromModel(await this.repository.save(Stair));
    }

    async get(id: string): Promise<StairDto> {
        const Stair : Stair = await this.repository.findById(id);
        if (!Stair) {
            throw new NotFoundException( 'Stair does not exist');
        }

        return StairDtoMapper.fromModel(Stair);
    }

    async update(id: string, stairDto: StairDto): Promise<StairDto> {
        const element : Element = await this.elementRepository.findById(stairDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }

        stairDto.id = id;
        const Stair : Stair = StairDtoMapper.toModel(stairDto, element);
        return StairDtoMapper.fromModel( await this.repository.updateElement(Stair));
    }

    async getStairByElement(elementId: string): Promise<StairDto> {
        const stair : Stair = await this.repository.findByElement(elementId);
        if (!stair) {
            throw new NotFoundException('no stair found for this element');
        }

        return StairDtoMapper.fromModel(stair);
    }

}
