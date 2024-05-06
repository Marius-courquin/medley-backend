import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { WallSocketTypeDto } from '@infrastructure/dtos/enum/wallSocket.enum.dto';
import { ApiProperty } from '@nestjs/swagger';

export class WallSocketDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsEnum(WallSocketTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: WallSocketTypeDto;

    @IsUUID(4, { message: 'subElementId must be a valid uuid' })
    @ApiProperty()
    subElementId: string;   

    constructor (type: WallSocketTypeDto, subElementId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.subElementId = subElementId;
    }

}