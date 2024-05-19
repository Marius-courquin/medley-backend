import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { GenericSubElementTypeDto } from '@infrastructure/dtos/enum/genericSubElement.enum.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GenericSubElementDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the generic sub element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsEnum(GenericSubElementTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the generic sub element',
        example: 'DEFAULT',
        enum: GenericSubElementTypeDto,
    })
    type: GenericSubElementTypeDto;

    @IsUUID(4, { message: 'subElementId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the parent sub element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    subElementId: string;

    constructor (type: GenericSubElementTypeDto, subElementId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.subElementId = subElementId;
    }

}