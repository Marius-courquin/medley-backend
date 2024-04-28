import { WallSocketType } from "@domain/entities/enum/wallSocket.enum.entity";
import { WallSocketTypeDto } from "@infrastructure/dtos/enum/wallSocket.enum.dto";
import { WallSocket } from "@domain/entities/wallSocket.entity";
import { WallSocketDto } from "@infrastructure/dtos/wallSocket.dto";
import { SubElement } from "@domain/entities/subElement.entity";

export class WallSocketDtoMapper {

    static fromModel(wallSocket : WallSocket): WallSocketDto {
        return new WallSocketDto(
            this.enumToDto(wallSocket.type),
            wallSocket.subElement.id,
            wallSocket.id
        );
    }

    static toModel(wallSocketDto: WallSocketDto, subElement : SubElement): WallSocket {
        return new WallSocket(
            this.enumToModel(wallSocketDto.type),
            subElement,
            wallSocketDto.id
        );
    }

    private static enumToModel (type: WallSocketTypeDto): WallSocketType {
        return WallSocketType[type];
    }

    private static enumToDto (type: WallSocketType): WallSocketTypeDto  {
        return WallSocketTypeDto[type];
    }
    
}