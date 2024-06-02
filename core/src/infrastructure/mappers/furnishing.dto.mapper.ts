
import { Element } from "@domain/entities/element.entity";
import { Furnishing } from "@domain/entities/furnishing.entity";
import { FurnishingDto } from "@infrastructure/dtos/furnishing.dto";
import { FurnishingType } from "@domain/entities/enum/furnishing.enum.entity";
import { FurnishingTypeDto } from "@infrastructure/dtos/enum/furnishing.enum.dto";

export class FurnishingDtoMapper {
    static fromModel(furnishing : Furnishing): FurnishingDto {
        return new FurnishingDto(
            furnishing.order,
            this.furnishingTypeFromModel(furnishing.type),
            furnishing.description,
            furnishing.element.id,
            furnishing.id
        );
    }
    
    static toModel(furnishingDto: FurnishingDto , element : Element): Furnishing {
        return new Furnishing(
            furnishingDto.order,
            this.furnishingTypeToModel(furnishingDto.type),
            furnishingDto.description,
            element,
            furnishingDto.id
        );
    }

    private static furnishingTypeFromModel (type: FurnishingType): FurnishingTypeDto {
        return FurnishingTypeDto[type];
    }

    private static furnishingTypeToModel (type: FurnishingTypeDto): FurnishingType {
        return FurnishingType[type];
    }
    

}