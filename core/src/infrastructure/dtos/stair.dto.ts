import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { StairDirectionDto, StairTypeDto } from "@infrastructure/dtos/enum/stair.enum.dto";

export class StairDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the stair',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsEnum(StairTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the stair',
        example: 'WOOD',
        enum: StairTypeDto,
    })
    type: StairTypeDto;

    @IsEnum(StairDirectionDto, { message: 'direction must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The direction of the stair',
        example: 'UP',
        enum: StairDirectionDto,
    })
    direction: StairDirectionDto;


    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the parent element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    elementId: string;

    constructor (type: StairTypeDto, direction: StairDirectionDto, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.direction = direction;
        this.elementId = elementId;
    }

}