
import { Element } from "@domain/entities/element.entity";
import { Ceiling } from "@domain/entities/ceiling.entity";
import { CeilingDto } from "@infrastructure/dtos/ceiling.dto";
import { CeilingType } from "@domain/entities/enum/ceiling.enum.entity";
import { CeilingTypeDto } from "@infrastructure/dtos/enum/ceiling.enum.dto";

export class CeilingDtoMapper {
    static fromModel(Ceiling : Ceiling): CeilingDto {
        return new CeilingDto(
            this.ceilingTypeFromModel(Ceiling.type),
            Ceiling.upperAccessHatch,
            Ceiling.element.id,
            Ceiling.id
        );
    }
    
    static toModel(CeilingDto: CeilingDto , element : Element): Ceiling {
        return new Ceiling(
            this.ceilingTypeToModel(CeilingDto.type),
            CeilingDto.upperAccessHatch,
            element,
            CeilingDto.id
        );
    }

    private static ceilingTypeFromModel (type: CeilingType): CeilingTypeDto {
        return CeilingTypeDto[type];
    }

    private static ceilingTypeToModel (type: CeilingTypeDto): CeilingType {
        return CeilingType[type];
    }
    

}