import {EstateWithFileDto} from "@infrastructure/dtos/estateWithFile.dto"
import {Estate} from "@domain/entities/estate.entity"
import { Third } from "@domain/entities/third.entity";
import { ClassType, EstateType, HeaterType, WaterHeaterType } from "@domain/entities/enum/estate.enum.entity";
import { ClassTypeDto, EstateTypeDto, HeaterTypeDto, WaterHeaterTypeDto } from "@infrastructure/dtos/enum/estate.enum.dto";
import {Picture} from "@domain/entities/picture.entity";
import {EstateWithLinkDto} from "@infrastructure/dtos/estateWithLink.dto";
export class EstateDtoMapper {
    static fromModel (estate: Estate): EstateWithFileDto {
        return new EstateWithFileDto(
            estate.id,
            estate.name,
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

    static fromModelWithLink (estate: Estate, picture?: string): EstateWithLinkDto {
        return new EstateWithLinkDto(
            estate.id,
            estate.name,
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
            estate.owner.id,
            picture
        );
    }

    static toModel (estateDto: EstateWithFileDto, third: Third, picture?: Picture): Estate {
        return new Estate(
            estateDto.name,
            estateDto.streetNumber,
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
            estateDto.id,
            picture ? picture : undefined
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




