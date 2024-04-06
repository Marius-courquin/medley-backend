import {Mapper} from "@infrastructure/controllers/mappers/mapper"
import {EstateDto} from "@infrastructure/controllers/dtos/estate.dto"
import {Estate} from "@domain/entities/estate.entity"

export abstract class EstateDtoMapper extends Mapper <Estate, EstateDto> {
    fromModel(estate: Estate): EstateDto {
        return new EstateDto(
            estate.streetNumber,
            estate.streetName,
            estate.zipCode,
            estate.city,
            estate.floor,
            estate.flatNumber,
            estate.description,
            estate.livingSpace,
            estate.roomCount,
            estate.type,
            estate.class,
            estate.heaterType,
            estate.waterHeaterType,
            estate.createdAt,
            estate.owner.id
        );
    }
}




