import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsOptional, IsString, IsUUID} from "class-validator";
import { ElementTypeDto } from "@infrastructure/dtos/enum/element.enum.dto";

export class ElementDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsOptional()
    @IsString({ message: 'name must be a string' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The help of the element',
        example: 'This is the first wall on your right when you enter.',
    })
    help?: string;

    @IsEnum(ElementTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the element',
        example: 'WALL',
        enum: ElementTypeDto,
    })
    type: ElementTypeDto;

    @IsUUID(4, { message: 'roomId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the element room',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    roomId: string;


    constructor (type: ElementTypeDto,roomId: string, id?: string, help?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.roomId = roomId;
        this.help = help ?? undefined;
    }

}