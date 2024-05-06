import { WindowOrientation } from "@domain/entities/enum/window.enum.entity";
import { Window } from "@domain/entities/window.entity";
import { WindowDto } from "@infrastructure/dtos/window.dto";
import { WindowOrientationDto } from "@infrastructure/dtos/enum/window.enum.dto";
import { SubElement } from "@domain/entities/subElement.entity";

export class WindowDtoMapper {
    static fromModel(window : Window): WindowDto {
        return new WindowDto(
            this.enumToDto(window.orientation),
            window.subElement.id,
            window.hasSchutter,
            window.id
        );
    }

    static toModel(windowDto: WindowDto, subElement : SubElement): Window {
        return new Window(
            this.enumToModel(windowDto.orientation),
            windowDto.hasSchutter,
            subElement,
            windowDto.id
        );
    }

    private static enumToModel (type: WindowOrientationDto): WindowOrientation {
        return WindowOrientation[type];
    }

    private static enumToDto (type: WindowOrientation): WindowOrientationDto  {
        return WindowOrientationDto[type];
    }
    
}