import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { FurnishingTypeDto } from "@infrastructure/dtos/enum/furnishing.enum.dto";

export class FurnishingDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the furnishing',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsNumber({}, { message: 'order must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The order of the furnishing',
        example: 1,
    })
    order: number;

    @IsEnum(FurnishingTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the furnishing',
        example: 'TABLE',
        enum: FurnishingTypeDto,
    })
    type: FurnishingTypeDto;

    @IsString({ message: 'description must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The description of the furnishing',
        example: 'A beautiful table',
    })
    description: string;

    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the parent element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    elementId: string;

    constructor (order: number, type: FurnishingTypeDto, description: string, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.order = order;
        this.type = type;
        this.description = description;
        this.elementId = elementId;
    }
}