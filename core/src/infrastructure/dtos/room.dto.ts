import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { RoomTypeDto } from "./enum/room.enum.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RoomDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsNumber({}, { message: 'roomNumber must be a valid number' })
    @ApiProperty()
    order: number;

    @IsEnum(RoomTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: RoomTypeDto;

    @IsString({ message: 'description must be a valid string' })
    @ApiProperty()
    description: string;

    @IsNumber({}, { message: 'livingSpace must be a valid number' })
    @ApiProperty()
    livingSpace: number;

    @IsNumber({}, { message: 'wallsCount must be a valid number' })
    @ApiProperty()
    wallsCount: number;

    @IsNumber({}, { message: 'doorsCount must be a valid number' })
    @ApiProperty()
    doorsCount: number;

    @IsNumber({}, { message: 'windowsCount must be a valid number' })
    @ApiProperty()
    windowsCount: number;

    @IsString({ message: 'assignment must be a valid string' })
    @ApiProperty()
    assignment: string;

    @IsString({ message: 'estateId must be a valid string' })
    @ApiProperty()
    estateId: string;

    constructor (order: number, type: RoomTypeDto, description: string, livingSpace: number, wallsCount: number, doorsCount: number, windowsCount: number, assignment: string, estateId: string, id?: string) {
        this.id = id ?? undefined;
        this.order = order;
        this.type = type;
        this.description = description;
        this.livingSpace = livingSpace;
        this.wallsCount = wallsCount;
        this.doorsCount = doorsCount;
        this.windowsCount = windowsCount;
        this.assignment = assignment;
        this.estateId = estateId;
    }
}