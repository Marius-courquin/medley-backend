import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { SubElementTypeDto } from '@infrastructure/dtos/enum/subElement.enum.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SubElementDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the sub element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsNumber({}, { message: 'roomCount must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The order of the sub element',
        example: 1,
    })
    order: number;

    @IsEnum(SubElementTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the sub element',
        example: 'WINDOW',
        enum: SubElementTypeDto,
    })
    type: SubElementTypeDto;

    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the parent element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    elementId: string;   

    constructor (type: SubElementTypeDto, order: number, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.order = order;
        this.type = type;
        this.elementId = elementId;
    }

}