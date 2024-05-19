import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { RoomTypeDto } from "@infrastructure/dtos/enum/room.enum.dto";
import { ApiProperty } from "@nestjs/swagger";

export class RoomDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the room',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsNumber({}, { message: 'roomNumber must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The number of the room',
        example: 1,
    })
    order: number;

    @IsEnum(RoomTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the room',
        example: 'LIVING_ROOM',
        enum: RoomTypeDto,
    })
    type: RoomTypeDto;

    @IsString({ message: 'description must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The description of the room',
        example: 'A beautiful living room',
    })
    description: string;

    @IsNumber({}, { message: 'livingSpace must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The living space of the room',
        example: 25,
    })
    livingSpace: number;

    @IsNumber({}, { message: 'wallsCount must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The number of walls of the room',
        example: 4,
    })
    wallsCount: number;

    @IsNumber({}, { message: 'doorsCount must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The number of doors of the room',
        example: 1,
    })
    doorsCount: number;

    @IsNumber({}, { message: 'windowsCount must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The number of windows of the room',
        example: 2,
    })
    windowsCount: number;

    @IsString({ message: 'assignment must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The assignment of the room',
        example: 'LIVING',
    })
    assignment: string;

    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the estate',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
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