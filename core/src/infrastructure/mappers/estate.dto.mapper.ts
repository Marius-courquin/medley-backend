import {EstateDto} from "@infrastructure/dtos/estate.dto"
import {Estate} from "@domain/entities/estate.entity"
import { Third } from "@/domain/entities/third.entity";
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
            estate.type,
            estate.class,
            estate.heaterType,
            estate.waterHeaterType,
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
            estateDto.type,
            estateDto.class,
            estateDto.heaterType,
            estateDto.waterHeaterType,
            third,
            estateDto.id
        );
    }

}




