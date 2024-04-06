import {Mapper} from "@infrastructure/controllers/mappers/mapper"
import {ThirdDto} from "@infrastructure/controllers/dtos/third.dto"
import {Third} from "@domain/entities/third.entity"


export abstract class ThirdDtoMapper extends Mapper <Third, ThirdDto> {
    fromModel(third: Third): ThirdDto {
        return new ThirdDto(
            third.type,
            third.lastName,
            third.firstName,
            third.dob,
            third.iban
        );
    }
}