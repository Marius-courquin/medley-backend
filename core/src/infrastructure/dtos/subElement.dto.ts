import {IsEnum, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';
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

    @IsOptional()
    @IsString({ message: 'help must be a string' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The help of the sub element',
        example: 'This is the first window on your right when you enter.',
    })
    help?: string;

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

    constructor (type: SubElementTypeDto, order: number, elementId: string, id?: string, help?: string) {
        this.id = id ?? undefined;
        this.order = order;
        this.type = type;
        this.elementId = elementId;
        this.help = help ?? undefined;
    }

}