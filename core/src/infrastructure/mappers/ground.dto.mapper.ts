
import { Element } from "@domain/entities/element.entity";
import { Ground } from "@domain/entities/ground.entity";
import { GroundDto } from "@infrastructure/dtos/ground.dto";
import { GroundType } from "@domain/entities/enum/ground.enum.entity";
import { GroundTypeDto } from "@infrastructure/dtos/enum/ground.enum.dto";

export class GroundDtoMapper {
    static fromModel(ground : Ground): GroundDto {
        return new GroundDto(
            this.groundTypeFromModel(ground.type),
            ground.lowerAccessHatch,
            ground.element.id,
            ground.id
        );
    }
    
    static toModel(groundDto: GroundDto , element : Element): Ground {
        return new Ground(
            this.groundTypeToModel(groundDto.type),
            groundDto.lowerAccessHatch,
            element,
            groundDto.id
        );
    }

    private static groundTypeFromModel (type: GroundType): GroundTypeDto {
        return GroundTypeDto[type];
    }

    private static groundTypeToModel (type: GroundTypeDto): GroundType {
        return GroundType[type];
    }
    

}