import {EstateDto} from "@infrastructure/dtos/estate.dto"
import {Estate} from "@domain/entities/estate.entity"
import { Third } from "@domain/entities/third.entity";
import { ClassType, EstateType, HeaterType, WaterHeaterType } from "@domain/entities/enum/estate.enum.entity";
import { ClassTypeDto, EstateTypeDto, HeaterTypeDto, WaterHeaterTypeDto } from "@infrastructure/dtos/enum/estate.enum.dto";
export class EstateDtoMapper {
    static fromModel (estate: Estate): EstateDto {
        return new EstateDto(
            estate.id,
            estate.streetNumber,
            estate.streetName,
            estate.zipCode,
            estate.city,
            estate.floor,
            estate.flatNumber,
            estate.description,
            estate.livingSpace,
            estate.roomCount,
            this.estateTypeFromModel(estate.type),
            this.estateClassFromModel(estate.class),
            this.heaterTypeFromModel(estate.heaterType),
            this.waterHeaterTypeFromModel(estate.waterHeaterType),
            estate.owner.id
        );
    }

    static toModel (estateDto: EstateDto, third: Third): Estate {
        return new Estate(estateDto.streetNumber, 
            estateDto.streetName,
            estateDto.zipCode,
            estateDto.city,
            estateDto.floor,
            estateDto.flatNumber,
            estateDto.description,
            estateDto.livingSpace,
            estateDto.roomCount,
            this.estateTypeToModel(estateDto.type),
            this.estateClassToModel(estateDto.class),
            this.heaterTypeToModel(estateDto.heaterType),
            this.waterHeaterTypeToModel(estateDto.waterHeaterType),
            third,
            estateDto.id
        );
    }

    private static estateTypeToModel (type: EstateTypeDto): EstateType {
        return EstateType[type];
    }

    private static estateTypeFromModel (type: EstateType): EstateTypeDto {
        return EstateTypeDto[type];
    }

    private static estateClassToModel (type: ClassTypeDto): ClassType{
        return ClassType[type];
    }

    private static estateClassFromModel (type: ClassType): ClassTypeDto{
        return ClassTypeDto[type];
    }

    private static heaterTypeToModel (type: HeaterTypeDto): HeaterType {
        return HeaterType[type];
    }

    private static heaterTypeFromModel (type: HeaterType): HeaterTypeDto {
        return HeaterTypeDto[type];
    }

    private static waterHeaterTypeToModel (type: WaterHeaterTypeDto): WaterHeaterType {
        return WaterHeaterType[type];
    }

    private static waterHeaterTypeFromModel (type: WaterHeaterType): WaterHeaterTypeDto {
        return WaterHeaterTypeDto[type];
    }

}




