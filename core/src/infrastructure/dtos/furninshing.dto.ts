import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { FurnishingTypeDto } from "@infrastructure/dtos/enum/furnishing.enum.dto";

export class FurnishingDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsNumber({}, { message: 'order must be a valid number' })
    order: number;

    @IsEnum(FurnishingTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: FurnishingTypeDto;

    @IsString({ message: 'description must be a valid string' })
    description: string;

    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty()
    elementId: string;

    constructor (order: number, type: FurnishingTypeDto, description: string, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.order = order;
        this.type = type;
        this.description = description;
        this.elementId = elementId;
    }
}