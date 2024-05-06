import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { StairDirectionDto, StairTypeDto } from "@infrastructure/dtos/enum/stair.enum.dto";

export class StairDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsEnum(StairTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: StairTypeDto;

    @IsEnum(StairDirectionDto, { message: 'direction must be a valid type' })
    @ApiProperty()
    direction: StairDirectionDto;


    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty()
    elementId: string;

    constructor (type: StairTypeDto, direction: StairDirectionDto, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.direction = direction;
        this.elementId = elementId;
    }

}