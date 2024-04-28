import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { GenericSubElementTypeDto } from '@infrastructure/dtos/enum/genericSubElement.enum.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GenericSubElementDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsEnum(GenericSubElementTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: GenericSubElementTypeDto;

    @IsUUID(4, { message: 'subElementId must be a valid uuid' })
    @ApiProperty()
    subElementId: string;

    constructor (type: GenericSubElementTypeDto, subElementId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.subElementId = subElementId;
    }

}