import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsUUID } from "class-validator";
import { CeilingTypeDto } from "@infrastructure/dtos/enum/ceiling.enum.dto";

export class CeilingDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsEnum(CeilingTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: CeilingTypeDto;

    @IsBoolean({ message: 'upperAccessHatch must be a valid boolean' })
    upperAccessHatch: boolean;

    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty()
    elementId: string;

    constructor (type: CeilingTypeDto, upperAccessHatch: boolean, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.upperAccessHatch = upperAccessHatch;
        this.elementId = elementId;
    }

}