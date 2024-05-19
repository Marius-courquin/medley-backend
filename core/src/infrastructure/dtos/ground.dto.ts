import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsUUID } from "class-validator";
import { GroundTypeDto } from "@infrastructure/dtos/enum/ground.enum.dto";

export class GroundDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the ground',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsEnum(GroundTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the ground',
        example: 'CONCRETE',
        enum: GroundTypeDto,
    })
    type: GroundTypeDto;

    @IsBoolean({ message: 'lowerAccessHatch must be a valid boolean' })
    @ApiProperty({
        required: true,
        type: 'boolean',
        description: 'The presence of a lower access hatch',
        example: true,
    })
    lowerAccessHatch: boolean;

    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the parent element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    elementId: string;

    constructor (type: GroundTypeDto, lowerAccessHatch: boolean, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.lowerAccessHatch = lowerAccessHatch;
        this.elementId = elementId;
    }

}