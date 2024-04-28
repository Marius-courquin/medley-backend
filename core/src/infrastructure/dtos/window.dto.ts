import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { WindowOrientationDto } from '@infrastructure/dtos/enum/window.enum.dto';
import { ApiProperty } from '@nestjs/swagger';

export class WindowDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsEnum(WindowOrientationDto, { message: 'orientation must be a valid type' })
    @ApiProperty()
    orientation: WindowOrientationDto;

    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    subElementId: string;

    @IsBoolean({ message: 'hasSchutter must be a valid boolean' })
    @ApiProperty()
    hasSchutter: boolean;

    constructor (orientation: WindowOrientationDto, subElementId: string, hasSchutter: boolean, id?: string) {
        this.id = id ?? undefined;
        this.orientation = orientation;
        this.subElementId = subElementId;
        this.hasSchutter = hasSchutter;
    }
}