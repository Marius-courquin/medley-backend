import { Injectable, NotFoundException } from '@nestjs/common';
import { Ground } from "@domain/entities/ground.entity";
import { GroundRepository } from "@domain/repositories/ground.repository";
import { GroundDtoMapper } from '@infrastructure/mappers/ground.dto.mapper';
import { Element } from '@domain/entities/element.entity';
import { ElementRepository } from '@domain/repositories/element.repository';
import { GroundDto } from '@infrastructure/dtos/ground.dto';


@Injectable()
export class GroundService {
    constructor(
        private readonly repository: GroundRepository,
        private readonly elementRepository: ElementRepository
    ) {}

    async createGround(groundDto: GroundDto): Promise<GroundDto> {
        const element : Element = await this.elementRepository.findById(groundDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }
        if(element.type !== 'GROUND') {
            throw new NotFoundException('element is not a ground');
        }
        const ground : Ground = GroundDtoMapper.toModel(groundDto, element);
        return GroundDtoMapper.fromModel(await this.repository.save(ground));
    }

    async getGround(id: string): Promise<GroundDto> {
        const ground : Ground = await this.repository.findById(id);
        if (!ground) {
            throw new NotFoundException( 'Ground does not exist');
        }

        return GroundDtoMapper.fromModel(ground);
    }

    async updateGround(id: string, groundDto: GroundDto): Promise<GroundDto> {
        const element : Element = await this.elementRepository.findById(groundDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }

        groundDto.id = id;
        const Stair : Ground = GroundDtoMapper.toModel(groundDto, element);
        return GroundDtoMapper.fromModel( await this.repository.updateGround(Stair));
    }

    async findGroundByElement(elementId: string): Promise<GroundDto> {
        const ground : Ground = await this.repository.findByElement(elementId);
        if (!ground) {
            throw new NotFoundException('no ground found for this element');
        }
        return GroundDtoMapper.fromModel(ground);
    }

}
