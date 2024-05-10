import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { WindowOrientationDto } from '@infrastructure/dtos/enum/window.enum.dto';
import { ApiProperty } from '@nestjs/swagger';

export class WindowDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the window',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsEnum(WindowOrientationDto, { message: 'orientation must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The orientation of the window',
        example: 'NORTH',
        enum: WindowOrientationDto,
    })
    orientation: WindowOrientationDto;

    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the parent sub element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    subElementId: string;

    @IsBoolean({ message: 'hasSchutter must be a valid boolean' })
    @ApiProperty({
        required: true,
        type: 'boolean',
        description: 'The presence of a schutter on the window',
        example: true,
    })
    hasSchutter: boolean;

    constructor (orientation: WindowOrientationDto, subElementId: string, hasSchutter: boolean, id?: string) {
        this.id = id ?? undefined;
        this.orientation = orientation;
        this.subElementId = subElementId;
        this.hasSchutter = hasSchutter;
    }
}