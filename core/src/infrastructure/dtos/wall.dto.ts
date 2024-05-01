import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator";
import { WallTypeDto } from "@infrastructure/dtos/enum/wall.enum.dto";

export class WallDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsNumber({}, { message: 'order must be a valid number' })
    @ApiProperty()
    order: number;

    @IsEnum(WallTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: WallTypeDto;

    @IsNumber({}, { message: 'windowsCount must be a valid number' })
    @ApiProperty()
    windowsCount: number;

    @IsNumber({}, { message: 'radiatorsCount must be a valid number' })
    @ApiProperty()
    radiatorsCount: number;

    @IsNumber({}, { message: 'wallSocketsCount must be a valid number' })
    @ApiProperty()
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