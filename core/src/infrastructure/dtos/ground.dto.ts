import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsUUID } from "class-validator";
import { GroundTypeDto } from "@infrastructure/dtos/enum/ground.enum.dto";

export class GroundDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsEnum(GroundTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: GroundTypeDto;

    @IsBoolean({ message: 'lowerAccessHatch must be a valid boolean' })
    lowerAccessHatch: boolean;

    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty()
    elementId: string;

    constructor (type: GroundTypeDto, lowerAccessHatch: boolean, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.lowerAccessHatch = lowerAccessHatch;
        this.elementId = elementId;
    }

}