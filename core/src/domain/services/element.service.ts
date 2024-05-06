import { Injectable, NotFoundException } from '@nestjs/common';
import { Element } from "@domain/entities/element.entity";
import { ElementRepository } from "@domain/repositories/element.repository";
import { ElementDtoMapper } from '@infrastructure/mappers/element.dto.mapper';
import { ElementDto } from '@infrastructure/dtos/element.dto';
import { RoomRepository } from '@domain/repositories/room.repository';
import { Room } from '@domain/entities/room.entity';
import { WallRepository } from "@domain/repositories/wall.repository"
import { CeilingRepository } from '@domain/repositories/ceiling.repository';
import { GroundRepository } from '@domain/repositories/ground.repository';
import { StairRepository } from '@domain/repositories/stair.repository'
import { FurnishingRepository } from '@/domain/repositories/furnishing.repository';
import { WallDto } from '@infrastructure/dtos/wall.dto';
import { CeilingDto } from '@infrastructure/dtos/ceiling.dto';
import { GroundDto } from '@infrastructure/dtos/ground.dto';
import { StairDto } from '@infrastructure/dtos/stair.dto';
import { FurnishingDto } from '@infrastructure/dtos/furninshing.dto';
import { WallDtoMapper } from '@infrastructure/mappers/wall.dto.mapper';
import { CeilingDtoMapper } from '@infrastructure/mappers/ceiling.dto.mapper';
import { GroundDtoMapper } from '@infrastructure/mappers/ground.dto.mapper';
import { StairDtoMapper } from '@infrastructure/mappers/stair.dto.mapper';
import { FurnishingDtoMapper } from '@infrastructure/mappers/furnishing.dto.mapper';
import { Wall } from '@domain/entities/wall.entity';
import { Ceiling } from '@domain/entities/ceiling.entity';
import { Ground } from '@domain/entities/ground.entity';
import { Stair } from '@domain/entities/stair.entity';
import { Furnishing } from '@domain/entities/furnishing.entity';


@Injectable()
export class ElementService {
    constructor(
        private readonly repository: ElementRepository,
        private readonly roomRepository: RoomRepository,
        private readonly wallRepository: WallRepository,
        private readonly ceilingRepository: CeilingRepository,
        private readonly groundRepository: GroundRepository,
        private readonly stairRepository: StairRepository,
        private readonly furnishingRepository: FurnishingRepository,
    ) {}

    async create(elementDto: ElementDto): Promise<ElementDto> {
        const room : Room = await this.roomRepository.findById(elementDto.roomId);
        if (!room) {
            throw new NotFoundException('Room does not exist');
        }

        const element : Element = ElementDtoMapper.toModel(elementDto, room);
        return ElementDtoMapper.fromModel(await this.repository.save(element));
    }

    async get(id: string): Promise<ElementDto> {
        const element : Element = await this.repository.findById(id);
        if (!element) {
            throw new NotFoundException( 'element does not exist');
        }

        return ElementDtoMapper.fromModel(element);
    }

    async update(id: string, elementDto: ElementDto): Promise<ElementDto> {
        const room : Room = await this.roomRepository.findById(elementDto.roomId);
        if (!room) {
            throw new NotFoundException('Room does not exist');
        }

        elementDto.id = id;
        const element : Element = ElementDtoMapper.toModel(elementDto, room);
        return ElementDtoMapper.fromModel( await this.repository.updateElement(element));
    }

    async getElementByRoom(roomId: string): Promise<ElementDto[]> {
        const elements : Element[] = await this.repository.findByRoom(roomId);
        if (elements.length === 0) {
            throw new NotFoundException('no elements found for this room');
        }

        return elements.map(element => ElementDtoMapper.fromModel(element));
    }

    async getRelatedEntity(id: string): Promise<WallDto | CeilingDto  | GroundDto | StairDto | FurnishingDto> {
        const element : Element = await this.repository.findById(id);
        if (!element) {
            throw new NotFoundException('Element does not exist');
        }
        switch (element.type) {
            case 'WALL':
                const wall : Wall = await this.wallRepository.findByElement(id);
                if (!wall) {
                    throw new NotFoundException('no wall found for this element');
                }
                return WallDtoMapper.fromModel(wall);
            case 'CEILING':
                const ceiling : Ceiling = await this.ceilingRepository.findByElement(id);
                if (!ceiling) {
                    throw new NotFoundException('no ceiling found for this element');
                }
                return CeilingDtoMapper.fromModel(ceiling);
            case 'GROUND':
                const ground : Ground = await this.groundRepository.findByElement(id);
                if (!ground) {
                    throw new NotFoundException('no ground found for this element');
                }
                return GroundDtoMapper.fromModel(ground);
            case 'STAIR':
                const stairs : Stair = await this.stairRepository.findByElement(id);
                if (!stairs) {
                    throw new NotFoundException('no stair found for this element');
                }
                return StairDtoMapper.fromModel(stairs);
            case 'FURNISHING':
                const furnishing : Furnishing = await this.furnishingRepository.findByElement(id);
                if (!furnishing) {
                    throw new NotFoundException('no furnishing found for this element');
                }
                return FurnishingDtoMapper.fromModel(furnishing);
            default:
                throw new NotFoundException('Element type not found');
        }
    }

}
