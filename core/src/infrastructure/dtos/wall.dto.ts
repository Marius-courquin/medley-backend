import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator";
import { WallTypeDto } from "@infrastructure/dtos/enum/wall.enum.dto";

export class WallDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsNumber({}, { message: 'order must be a valid number' })
    order: number;

    @IsEnum(WallTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: WallTypeDto;

    @IsNumber({}, { message: 'windowsCount must be a valid number' })
    windowsCount: number;

    @IsNumber({}, { message: 'radiatorsCount must be a valid number' })
    radiatorsCount: number;

    @IsNumber({}, { message: 'wallSocketsCount must be a valid number' })
    wallSocketsCount: number;

    @IsUUID(4, { message: 'elementId must be a valid uuid' })
    @ApiProperty()
    elementId: string;

    constructor (order: number, type: WallTypeDto, windowsCount: number, radiatorsCount: number, wallSocketsCount: number, elementId: string, id?: string) {
        this.id = id ?? undefined;
        this.order = order;
        this.type = type;
        this.windowsCount = windowsCount;
        this.radiatorsCount = radiatorsCount;
        this.wallSocketsCount = wallSocketsCount;
        this.elementId = elementId;
    }

}