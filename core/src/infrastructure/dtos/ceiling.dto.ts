import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsUUID } from "class-validator";
import { CeilingTypeDto } from "@infrastructure/dtos/enum/ceiling.enum.dto";

export class CeilingDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the ceiling',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsEnum(CeilingTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the ceiling',
        example: 'PLASTER',
        enum: CeilingTypeDto,
    })
    type: CeilingTypeDto;

    @IsBoolean({ message: 'upperAccessHatch must be a valid boolean' })
    @ApiProperty({
        required: true,
        type: 'boolean',
        description: 'The presence of an upper access hatch',
        example: true,
    })
    upperAccessHatch: boolean;

    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the parent element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    elementId: string;

    constructor (type: CeilingTypeDto, upperAccessHatch: boolean, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.upperAccessHatch = upperAccessHatch;
        this.elementId = elementId;
    }

}