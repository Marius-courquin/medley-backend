import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Ceiling} from "@domain/entities/ceiling.entity";
import {CeilingRepository} from "@domain/repositories/ceiling.repository";
import {CeilingDtoMapper} from '@infrastructure/mappers/ceiling.dto.mapper';
import {Element} from '@domain/entities/element.entity';
import {ElementRepository} from '@domain/repositories/element.repository';
import {CeilingDto} from '@infrastructure/dtos/ceiling.dto';


@Injectable()
export class CeilingService {
    constructor(
        private readonly repository: CeilingRepository,
        private readonly elementRepository: ElementRepository
    ) {}

    async create(ceilingDto: CeilingDto): Promise<CeilingDto> {
        const element : Element = await this.elementRepository.findById(ceilingDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }
        if(element.type !== 'CEILING') {
            throw new BadRequestException('element is not a ceiling');
        }

        const Stair : Ceiling = CeilingDtoMapper.toModel(ceilingDto, element);
        return CeilingDtoMapper.fromModel(await this.repository.save(Stair));
    }

    async get(id: string): Promise<CeilingDto> {
        const ceiling : Ceiling = await this.repository.findById(id);
        if (!ceiling) {
            throw new NotFoundException( 'Stair does not exist');
        }

        return CeilingDtoMapper.fromModel(ceiling);
    }

    async update(id: string, ceilingDto: CeilingDto): Promise<CeilingDto> {
        const element : Element = await this.elementRepository.findById(ceilingDto.elementId);
        if (!element) {
            throw new NotFoundException('element does not exist');
        }
        if(element.type !== 'CEILING') {
            throw new BadRequestException('element is not a ceiling');
        }

        ceilingDto.id = id;
        const ceiling : Ceiling = CeilingDtoMapper.toModel(ceilingDto, element);
        return CeilingDtoMapper.fromModel( await this.repository.updateElement(ceiling));
    }

    async getCeilingByElement(elementId: string): Promise<CeilingDto> {
        const ceiling : Ceiling = await this.repository.findByElement(elementId);
        if (!ceiling) {
            throw new NotFoundException('no ceiling found for this element');
        }

        return CeilingDtoMapper.fromModel(ceiling);
    }
}
