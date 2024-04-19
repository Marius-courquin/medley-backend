import { ElementType } from "@domain/entities/enum/element.enum.entity";
import { Room } from "@domain/entities/room.entity";
import { Element } from "@domain/entities/element.entity";
import { ElementDto } from "@infrastructure/dtos/element.dto";
import { ElementTypeDto } from "@infrastructure/dtos/enum/element.enum.dto";

export class ElementDtoMapper {
    static fromModel(element : Element): ElementDto {
        return new ElementDto(
            this.enumToDto(element.type),
            element.room.id,
            element.id
        );
    }

    static toModel(elementDto: ElementDto, room : Room): Element {
        return new Element(
            this.enumToModel(elementDto.type),
            elementDto.id,
            room
        );
    }

    private static enumToModel (type: ElementTypeDto): ElementType {
        return ElementType[type];
    }

    private static enumToDto (type: ElementType): ElementTypeDto  {
        return ElementTypeDto[type];
    }
    
}