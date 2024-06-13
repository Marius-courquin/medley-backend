
import { Element } from "@domain/entities/element.entity";
import { Furnishing } from "@domain/entities/furnishing.entity";
import { FurnishingWithFileDto} from "@infrastructure/dtos/furnishingWithFile.dto";
import { FurnishingWithLinkDto } from "@infrastructure/dtos/furnishingWithLink.dto";
import { FurnishingType } from "@domain/entities/enum/furnishing.enum.entity";
import { FurnishingTypeDto } from "@infrastructure/dtos/enum/furnishing.enum.dto";
import { PictureDto } from "@infrastructure/dtos/picture.dto";

export class FurnishingDtoMapper {
    static fromModelWithLink(furnishing : Furnishing, picture : PictureDto): FurnishingWithLinkDto {
        return new FurnishingWithLinkDto(
            furnishing.order,
            this.furnishingTypeFromModel(furnishing.type),
            furnishing.description,
            furnishing.element.id,
            picture,
            furnishing.id,
        );
    }
    
    static toModel(furnishingWithFileDto: FurnishingWithFileDto , element : Element): Furnishing {
        return new Furnishing(
            furnishingWithFileDto.order,
            this.furnishingTypeToModel(furnishingWithFileDto.type),
            furnishingWithFileDto.description,
            element,
            furnishingWithFileDto.id
        );
    }

    private static furnishingTypeFromModel (type: FurnishingType): FurnishingTypeDto {
        return FurnishingTypeDto[type];
    }

    private static furnishingTypeToModel (type: FurnishingTypeDto): FurnishingType {
        return FurnishingType[type];
    }
    

}