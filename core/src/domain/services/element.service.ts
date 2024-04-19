import { Injectable, NotFoundException } from '@nestjs/common';
import { Element } from "@domain/entities/element.entity";
import { ElementRepository } from "@domain/repositories/element.repository";
import { ElementDtoMapper } from '@infrastructure/mappers/element.dto.mapper';
import { ElementDto } from '@infrastructure/dtos/element.dto';
import { RoomRepository } from '@domain/repositories/room.repository';
import { Room } from '@domain/entities/room.entity';


@Injectable()
export class ElementService {
    constructor(
        private readonly repository: ElementRepository,
        private readonly roomRepository: RoomRepository
    ) {}

    async createElement(elementDto: ElementDto): Promise<ElementDto> {
        const room : Room = await this.roomRepository.findById(elementDto.roomId);
        if (!room) {
            throw new NotFoundException('Room does not exist');
        }

        const element : Element = ElementDtoMapper.toModel(elementDto, room);
        return ElementDtoMapper.fromModel(await this.repository.save(element));
    }

    async getElement(id: string): Promise<ElementDto> {
        const element : Element = await this.repository.findById(id);
        if (!element) {
            throw new NotFoundException( 'element does not exist');
        }

        return ElementDtoMapper.fromModel(element);
    }

    async updateElement(id: string, elementDto: ElementDto): Promise<ElementDto> {
        const room : Room = await this.roomRepository.findById(elementDto.roomId);
        if (!room) {
            throw new NotFoundException('Room does not exist');
        }

        elementDto.id = id;
        const element : Element = ElementDtoMapper.toModel(elementDto, room);
        return ElementDtoMapper.fromModel( await this.repository.updateElement(element));
    }

    async findElementByRoom(roomId: string): Promise<ElementDto[]> {
        const elements : Element[] = await this.repository.findByRoom(roomId);
        if (elements.length === 0) {
            throw new NotFoundException('no elements found for this room');
        }

        return elements.map(element => ElementDtoMapper.fromModel(element));
    }
}
