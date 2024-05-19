import { Injectable, NotFoundException } from "@nestjs/common";
import { EstateRepository } from "@domain/repositories/estate.repository";
import { RoomDto } from "@infrastructure/dtos/room.dto";
import { Room } from "@domain/entities/room.entity";
import { RoomRepository } from "@domain/repositories/room.repository";
import { RoomDtoMapper } from "@/infrastructure/mappers/room.dto.mapper";

@Injectable()
export class RoomService {
    constructor( 
        private readonly roomRepository: RoomRepository,
        private readonly estateRepository: EstateRepository
    ) {}

    async create(roomDto: RoomDto): Promise<RoomDto> {
        const estate = await this.estateRepository.findById(roomDto.estateId);
        if (!estate) {
            throw new NotFoundException( 'estate does not exist');
        }
        const room = RoomDtoMapper.toModel(roomDto, estate);
        return RoomDtoMapper.fromModel(await this.roomRepository.save(room));
    }

    async get(id: string): Promise<RoomDto> {
        const room: Room = await this.roomRepository.findById(id);
        if (!room) {
            throw new NotFoundException( 'room does not exist'); 
        }
        return RoomDtoMapper.fromModel(room);
    }

    async getAllForEstate(estateId: string): Promise<RoomDto[]> {
        const estate = await this.estateRepository.findById(estateId);
        if (!estate) {
            throw new NotFoundException( 'estate does not exist');
        }
        const rooms: Room[] = await this.roomRepository.findAllByEstate(estateId);
        return rooms.map(room => RoomDtoMapper.fromModel(room));
    }

    async update(room: any): Promise<RoomDto> {
        const estate = await this.estateRepository.findById(room.estateId);
        if (!estate) {
            throw new NotFoundException( 'estate does not exist');
        }
        const roomModel = RoomDtoMapper.toModel(room, estate);
        return RoomDtoMapper.fromModel(await this.roomRepository.updateElement(roomModel));
    }
}