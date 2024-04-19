
import { Element } from "@domain/entities/element.entity";
import { Stair } from "@domain/entities/stair.entity";
import { StairDto } from "@infrastructure/dtos/stair.dto";
import { StairType, StairDirection } from "@domain/entities/enum/stair.enum.entity";
import { StairDirectionDto, StairTypeDto } from "@infrastructure/dtos/enum/stair.enum.dto";

export class StairDtoMapper {
    static fromModel(stair : Stair): StairDto {
        return new StairDto(
            this.stairTypeFromModel(stair.type),
            this.stairDirectionFromModel(stair.direction),
            stair.element.id,
            stair.id
        );
    }
    
    static toModel(stairDto: StairDto , element : Element): Stair {
        return new Stair(
            this.stairTypeToModel(stairDto.type),
            this.stairDirectionToModel(stairDto.direction),
            element,
            stairDto.id
        );
    }

    private static stairTypeToModel (type: StairTypeDto): StairType {
        return StairType[type];
    }
    
    private static stairTypeFromModel (type: StairType): StairTypeDto {
        return StairTypeDto[type];
    }

    private static stairDirectionToModel (direction: StairDirectionDto ): StairDirection {
        return StairDirection[direction];
    }

    private static stairDirectionFromModel (direction: StairDirection): StairDirectionDto {
        return StairDirectionDto[direction];
    }
  
}