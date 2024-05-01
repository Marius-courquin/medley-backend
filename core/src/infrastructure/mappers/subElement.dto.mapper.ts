import { SubElementType } from "@domain/entities/enum/subElement.enum.entity";
import { SubElement } from "@domain/entities/subElement.entity";
import { SubElementDto } from "@/infrastructure/dtos/subElement.dto";
import { SubElementTypeDto } from "@infrastructure/dtos/enum/subElement.enum.dto";
import { Element } from "@domain/entities/element.entity";

export class SubElementDtoMapper {
    static fromModel(subElement : SubElement): SubElementDto {
        return new SubElementDto(
            this.enumToDto(subElement.type),
            subElement.order,
            subElement.element.id,
            subElement.id
        );
    }

    static toModel(subElementDto: SubElementDto, element : Element): SubElement {
        return new SubElement(
            this.enumToModel(subElementDto.type),
            subElementDto.order,
            element,
            subElementDto.id
        );
    }

    private static enumToModel (type: SubElementTypeDto): SubElementType {
        return SubElementType[type];
    }

    private static enumToDto (type: SubElementType): SubElementTypeDto  {
        return SubElementTypeDto[type];
    }
    
}