import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { WallSocketTypeDto } from '@infrastructure/dtos/enum/wallSocket.enum.dto';
import { ApiProperty } from '@nestjs/swagger';

export class WallSocketDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the wall socket',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsEnum(WallSocketTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the wall socket',
        example: 'ELECTRICAL',
        enum: WallSocketTypeDto,
    })
    type: WallSocketTypeDto;

    @IsUUID(4, { message: 'subElementId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the parent sub element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    subElementId: string;   

    constructor (type: WallSocketTypeDto, subElementId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.subElementId = subElementId;
    }

}