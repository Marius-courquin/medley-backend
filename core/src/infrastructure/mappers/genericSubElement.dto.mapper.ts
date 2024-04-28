import { GenericSubElementType } from "@domain/entities/enum/genericSubElement.enum.entity";
import { GenericSubElement } from "@domain/entities/genericSubElement.entity";
import { GenericSubElementDto } from "@infrastructure/dtos/genericSubElement.dto";
import { GenericSubElementTypeDto } from "@infrastructure/dtos/enum/genericSubElement.enum.dto";
import { SubElement } from "@domain/entities/subElement.entity";

export class GenericElementDtoMapper {
    static fromModel(genericSubElement : GenericSubElement): GenericSubElementDto {
        return new GenericSubElementDto(
            this.enumToDto(genericSubElement.type),
            genericSubElement.subElement.id,
            genericSubElement.id
        );
    }

    static toModel(genericSubElementDto: GenericSubElementDto, subElement : SubElement): GenericSubElement {
        return new GenericSubElement(
            this.enumToModel(genericSubElementDto.type),
            subElement,
            genericSubElementDto.id
        );
    }

    private static enumToModel (type: GenericSubElementTypeDto): GenericSubElementType {
        return GenericSubElementType[type];
    }

    private static enumToDto (type: GenericSubElementType): GenericSubElementTypeDto  {
        return GenericSubElementTypeDto[type];
    }
    
}