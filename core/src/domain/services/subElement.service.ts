import { Injectable, NotFoundException } from '@nestjs/common';
import { SubElement } from "@domain/entities/subElement.entity";
import { Element } from "@domain/entities/element.entity";
import { SubElementRepository } from "@domain/repositories/subElement.repository";
import { SubElementDtoMapper } from '@infrastructure/mappers/subElement.dto.mapper';
import { SubElementDto } from '@infrastructure/dtos/subElements.dto';
import { ElementRepository } from '@domain/repositories/element.repository';

@Injectable()
export class SubElementService {
    constructor(
        private readonly repository: SubElementRepository,
        private readonly elementRepository: ElementRepository,
    ) {}

    async createSubElement(subElementDto: SubElementDto): Promise<SubElementDto> {
        const element : Element = await this.elementRepository.findById(subElementDto.elementId);
        if (!element) {
            throw new NotFoundException('Element does not exist');
        }

        const subElement : SubElement = SubElementDtoMapper.toModel(subElementDto, element);
        return SubElementDtoMapper.fromModel(await this.repository.save(subElement));
    }

    async getSubElement(id: string): Promise<SubElementDto> {
        const subElement : SubElement = await this.repository.findById(id);
        if (!SubElement) {
            throw new NotFoundException( 'SubElement does not exist');
        }

        return SubElementDtoMapper.fromModel(subElement);
    }

    async updateSubElement(id: string, subElementDto: SubElementDto): Promise<SubElementDto> {
        const element : Element = await this.elementRepository.findById(subElementDto.elementId);
        if (!element) {
            throw new NotFoundException('Element does not exist');
        }

        subElementDto.id = id;
        const subElement : SubElement = SubElementDtoMapper.toModel(subElementDto, element);
        return SubElementDtoMapper.fromModel( await this.repository.updateSubElement(subElement));
    }

    async findSubElementsByElement(elementId: string): Promise<SubElementDto[]> {
        const subElement : SubElement[] = await this.repository.findByElement(elementId);
        if (subElement.length === 0) {
            throw new NotFoundException('no subElement found for this element');
        }

        return subElement.map(SubElementDtoMapper.fromModel);
    }

    // async getRelatedEntity(id: string): Promise<WallDto | CeilingDto  | GroundDto | StairDto | FurnishingDto> {
    //     const element : Element = await this.repository.findById(id);
    //     console.log("j'ai trouvé un elt",element);
    //     if (!element) {
    //         throw new NotFoundException('Element does not exist');
    //     }
    //     switch (element.type) {
    //         case 'WALL':
    //             const wall : Wall = await this.wallRepository.findByElement(id);
    //             if (!wall) {
    //                 throw new NotFoundException('no wall found for this element');
    //             }
    //             return WallDtoMapper.fromModel(wall);
    //         case 'CEILING':
    //             const ceiling : Ceiling = await this.ceilingRepository.findByElement(id);
    //             if (!ceiling) {
    //                 throw new NotFoundException('no ceiling found for this element');
    //             }
    //             return CeilingDtoMapper.fromModel(ceiling);
    //         case 'GROUND':
    //             const ground : Ground = await this.groundRepository.findByElement(id);
    //             if (!ground) {
    //                 throw new NotFoundException('no ground found for this element');
    //             }
    //             return GroundDtoMapper.fromModel(ground);
    //         case 'STAIR':
    //             const stairs : Stair = await this.stairRepository.findByElement(id);
    //             if (!stairs) {
    //                 throw new NotFoundException('no stair found for this element');
    //             }
    //             return StairDtoMapper.fromModel(stairs);
    //         case 'FURNISHING':
    //             const furnishing : Furnishing = await this.furnishingRepository.findByElement(id);
    //             if (!furnishing) {
    //                 throw new NotFoundException('no furnishing found for this element');
    //             }
    //             return FurnishingDtoMapper.fromModel(furnishing);
    //         default:
    //             throw new NotFoundException('Element type not found');
    //     }
    // }

}
