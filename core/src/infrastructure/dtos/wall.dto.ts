import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator";
import { WallTypeDto } from "@infrastructure/dtos/enum/wall.enum.dto";

export class WallDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the wall',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsNumber({}, { message: 'order must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The order of the wall',
        example: 1,
    })
    order: number;

    @IsEnum(WallTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the wall',
        example: 'WALLPAPER',
        enum: WallTypeDto,
    })
    type: WallTypeDto;

    @IsNumber({}, { message: 'windowsCount must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The number of windows of the wall',
        example: 2,
    })
    windowsCount: number;

    @IsNumber({}, { message: 'radiatorsCount must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The number of radiators of the wall',
        example: 1,
    })
    radiatorsCount: number;

    @IsNumber({}, { message: 'wallSocketsCount must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The number of wall sockets of the wall',
        example: 4,
    })
    wallSocketsCount: number;

    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the parent element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    elementId: string;

    constructor (order: number, type: WallTypeDto, windowsCount: number, radiatorsCount: number, wallSocketsCount: number, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.order = order;
        this.type = type;
        this.windowsCount = windowsCount;
        this.radiatorsCount = radiatorsCount;
        this.wallSocketsCount = wallSocketsCount;
        this.elementId = elementId;
    }

}