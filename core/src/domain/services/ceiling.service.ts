import { Injectable, NotFoundException } from '@nestjs/common';
import { Ceiling } from "@domain/entities/ceiling.entity";
import { CeilingRepository } from "@domain/repositories/ceiling.repository";
import { CeilingDtoMapper } from '@infrastructure/mappers/ceiling.dto.mapper';
import { Element } from '@domain/entities/element.entity';
import { ElementRepository } from '@domain/repositories/element.repository';
import { CeilingDto } from '@infrastructure/dtos/ceiling.dto';


@Injectable()
export class CeilingService {
    constructor(
        private readonly repository: CeilingRepository,
        private readonly elementRepository: ElementRepository
    ) {}

    async createCeiling(ceilingDto: CeilingDto): Promise<CeilingDto> {
        const element : Element = await this.elementRepository.findById(ceilingDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }

        const Stair : Ceiling = CeilingDtoMapper.toModel(ceilingDto, element);
        return CeilingDtoMapper.fromModel(await this.repository.save(Stair));
    }

    async getCeiling(id: string): Promise<CeilingDto> {
        const ceiling : Ceiling = await this.repository.findById(id);
        if (!ceiling) {
            throw new NotFoundException( 'Stair does not exist');
        }

        return CeilingDtoMapper.fromModel(ceiling);
    }

    async updateCeiling(id: string, ceilingDto: CeilingDto): Promise<CeilingDto> {
        const element : Element = await this.elementRepository.findById(ceilingDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }

        ceilingDto.id = id;
        const Stair : Ceiling = CeilingDtoMapper.toModel(ceilingDto, element);
        return CeilingDtoMapper.fromModel( await this.repository.updateGround(Stair));
    }

    async findCeilingByElement(elementId: string): Promise<CeilingDto[]> {
        let ceilings : Ceiling[] = await this.repository.findByElement(elementId);
        if (ceilings.length === 0) {
            throw new NotFoundException('no Stairs found for this element');
        }

        return ceilings.map(ceiling => CeilingDtoMapper.fromModel(ceiling));
    }
}
