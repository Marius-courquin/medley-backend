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

    async createRoom(roomDto: RoomDto): Promise<RoomDto> {
        const estate = await this.estateRepository.findById(roomDto.estateId);
        if (!estate) {
            throw new NotFoundException( 'estate does not exist');
        }
        const room = RoomDtoMapper.toModel(roomDto, estate);
        return RoomDtoMapper.fromModel(await this.roomRepository.save(room));
    }

    async getRoom(id: string): Promise<RoomDto> {
        const room: Room = await this.roomRepository.findById(id);
        if (!room) {
            throw new NotFoundException( 'room does not exist'); 
        }
        return RoomDtoMapper.fromModel(room);
    }

    async findByEstate(estateId: string): Promise<RoomDto[]> {
        const rooms: Room[] = await this.roomRepository.findByEstate(estateId);
        if (rooms.length <= 0) {
            throw new NotFoundException( 'no rooms found for this estate');
        }
        return rooms.map(room => RoomDtoMapper.fromModel(room));
    }

    async updateElement(room: any): Promise<RoomDto> {
        const estate = await this.estateRepository.findById(room.estateId);
        if (!estate) {
            throw new NotFoundException( 'estate does not exist');
        }
        const roomModel = RoomDtoMapper.toModel(room, estate);
        return RoomDtoMapper.fromModel(await this.roomRepository.updateElement(roomModel));
    }
}