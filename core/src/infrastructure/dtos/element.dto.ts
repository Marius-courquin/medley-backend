import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { ElementTypeDto } from "@infrastructure/dtos/enum/element.enum.dto";

export class ElementDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsEnum(ElementTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: ElementTypeDto;

    @IsUUID(4, { message: 'roomId must be a valid uuid' })
    @ApiProperty()
    roomId: string;


    constructor (type: ElementTypeDto,roomId: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.roomId = roomId;
    }

}