import { WallType } from "@domain/entities/enum/wall.enum.entity";
import { Element } from "@domain/entities/element.entity";
import { WallDto } from "@infrastructure/dtos/wall.dto";
import { WallTypeDto } from "@infrastructure/dtos/enum/wall.enum.dto";
import { Wall } from "@domain/entities/wall.entity";

export class WallDtoMapper {
    static fromModel(wall : Wall): WallDto {
        return new WallDto(
            wall.order,
            this.wallTypeFromModel(wall.type),
            wall.windowsCount,
            wall.radiatorsCount,
            wall.wallSocketsCount,
            wall.element.id,
            wall.id
        );
    }

    static toModel(wallDto: WallDto , element : Element): Wall {
        return new Wall(
            this.wallTypeToModel(wallDto.type),
            wallDto.order,
            wallDto.windowsCount,
            wallDto.radiatorsCount,
            wallDto.wallSocketsCount,
            element,
            wallDto.id
        );
    }

    private static wallTypeToModel (type: WallTypeDto): WallType {
        return WallType[type];
    }

    private static wallTypeFromModel (type: WallType): WallTypeDto  {
        return WallTypeDto[type];
    }
    
}