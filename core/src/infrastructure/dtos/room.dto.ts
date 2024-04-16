import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { RoomTypeDto } from "./enum/room.enum.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RoomDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @ApiProperty()
    @IsNumber({}, { message: 'roomNumber must be a valid number' })
    ordre: number;

    @ApiProperty()
    @IsEnum(RoomTypeDto, { message: 'type must be a valid type' })
    type: RoomTypeDto;

    @ApiProperty()
    @IsString({ message: 'description must be a valid string' })
    description: string;

    @ApiProperty()
    @IsNumber({}, { message: 'livingSpace must be a valid number' })
    livingSpace: number;

    @ApiProperty()
    @IsNumber({}, { message: 'wallsCount must be a valid number' })
    wallsCount: number;

    @ApiProperty()
    @IsNumber({}, { message: 'doorsCount must be a valid number' })
    doorsCount: number;

    @ApiProperty()
    @IsNumber({}, { message: 'windowsCount must be a valid number' })
    windowsCount: number;

    @IsString({ message: 'assignment must be a valid string' })
    @ApiProperty()
    assignment: string;

    @IsString({ message: 'estateId must be a valid string' })
    @ApiProperty()
    estateId: string;

    constructor (ordre: number, type: RoomTypeDto, description: string, livingSpace: number, wallsCount: number, doorsCount: number, windowsCount: number, assignment: string, estateId: string, id?: string) {
        this.id = id ?? undefined;
        this.ordre = ordre;
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