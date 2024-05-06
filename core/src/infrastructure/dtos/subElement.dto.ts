import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { SubElementTypeDto } from '@infrastructure/dtos/enum/subElement.enum.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SubElementDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsNumber({}, { message: 'roomCount must be a valid number' })
    @ApiProperty()
    order: number;

    @IsEnum(SubElementTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: SubElementTypeDto;

    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty()
    elementId: string;   

    constructor (type: SubElementTypeDto, order: number, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.order = order;
        this.type = type;
        this.elementId = elementId;
    }

}