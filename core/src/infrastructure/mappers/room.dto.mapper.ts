import { Room } from "@/domain/entities/room.entity";
import { RoomDto } from "../dtos/room.dto";
import { RoomType } from "@/domain/entities/enum/room.enum.entity";
import { RoomTypeDto } from "../dtos/enum/room.enum.dto";
import { Estate } from "@/domain/entities/estate.entity";

export class RoomDtoMapper{
    static fromModel(room: Room): RoomDto {
        return new RoomDto(
            room.order,
            this.roomTypeFromModel(room.type),
            room.description,
            room.livingSpace,
            room.wallsCount,
            room.doorsCount,
            room.windowsCount,
            room.assignment,
            room.estate.id,
            room.id
        );
    }

    static toModel(roomDto: RoomDto, estate: Estate): Room {
        return new Room(
            roomDto.order,
            this.roomTypeToModel(roomDto.type),
            roomDto.description,
            roomDto.livingSpace,
            roomDto.wallsCount,
            roomDto.doorsCount,
            roomDto.windowsCount,
            roomDto.assignment,
            estate,
            roomDto.id,
        );
    }

    private static roomTypeToModel(type: RoomTypeDto): RoomType {
        return RoomType[type];
    }
    
    private static roomTypeFromModel(type: RoomType): RoomTypeDto {
        return RoomTypeDto[type];
    }
}