import {ThirdDto} from "@infrastructure/dtos/third.dto"
import {Third} from "@domain/entities/third.entity"


export class ThirdDtoMapper {
    static fromModel(third: Third): ThirdDto {
        return new ThirdDto(
            third.id,
            third.type,
            third.lastName,
            third.firstName,
            third.dob,
            third.iban
        );
    }
    
}