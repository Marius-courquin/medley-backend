import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { FurnishingTypeDto } from "@infrastructure/dtos/enum/furnishing.enum.dto";
import { HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";

export class FurnishingWithFileDto {
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

    @IsOptional()
    @IsFile()
    @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
    @ApiProperty({
        required: true,
        type: 'file',
        description: 'The picture of the estate with the format jpeg, jpg or png',
        example: 'picture.png',
        pattern: 'image/jpeg | image/png | image/jpg',
    })
    picture?: MemoryStoredFile;

    constructor (order: number, type: FurnishingTypeDto, description: string, elementId: string, picture: MemoryStoredFile, id?: string) {
        this.order = order;
        this.type = type;
        this.description = description;
        this.elementId = elementId;
        this.picture = picture;
        this.id = id ?? undefined;
    }
}