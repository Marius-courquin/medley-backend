import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Ground } from "@domain/entities/ground.entity";
import { GroundRepository } from "@domain/repositories/ground.repository";
import { GroundDtoMapper } from '@infrastructure/mappers/ground.dto.mapper';
import { Element } from '@domain/entities/element.entity';
import { ElementRepository } from '@domain/repositories/element.repository';
import { GroundDto } from '@infrastructure/dtos/ground.dto';
import { ElementType } from '@domain/entities/enum/element.enum.entity';

@Injectable()
export class GroundService {
    constructor(
        private readonly repository: GroundRepository,
        private readonly elementRepository: ElementRepository
    ) {}

    async create(groundDto: GroundDto): Promise<GroundDto> {
        const element : Element = await this.elementRepository.findById(groundDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }
        if(element.type !== ElementType.GROUND) {
            throw new BadRequestException('element is not a ground');
        }
        const ground : Ground = GroundDtoMapper.toModel(groundDto, element);
        return GroundDtoMapper.fromModel(await this.repository.save(ground));
    }

    async get(id: string): Promise<GroundDto> {
        const ground : Ground = await this.repository.findById(id);
        if (!ground) {
            throw new NotFoundException( 'ground does not exist');
        }

        return GroundDtoMapper.fromModel(ground);
    }

    async update(id: string, groundDto: GroundDto): Promise<GroundDto> {
        const element : Element = await this.elementRepository.findById(groundDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }
        if(element.type !== ElementType.GROUND) {
            throw new BadRequestException('element is not a ground');
        }

        groundDto.id = id;
        const ground : Ground = GroundDtoMapper.toModel(groundDto, element);
        return GroundDtoMapper.fromModel( await this.repository.updateElement(ground));
    }

    async getGroundByElement(elementId: string): Promise<GroundDto> {
        const ground : Ground = await this.repository.findByElement(elementId);
        if (!ground) {
            throw new NotFoundException('no ground found for this element');
        }
        return GroundDtoMapper.fromModel(ground);
    }

}
