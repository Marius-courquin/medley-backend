import {ThirdDto} from "@infrastructure/dtos/third.dto"
import {Third} from "@domain/entities/third.entity"
import { ThirdTypeDto } from "@infrastructure/dtos/enum/third.enum.dto";
import { ThirdType as ThirdType } from "@/domain/entities/enum/third.enum.entity";


export class ThirdDtoMapper {
    static fromModel(third: Third): ThirdDto {
        return new ThirdDto(
            third.id,
            this.enumToDto(third.type),
            third.lastName,
            third.firstName,
            third.dob,
            third.iban
        );
    }

    static toModel(thirdDto: ThirdDto): Third {
        return new Third(
            this.enumToModel(thirdDto.type),
            thirdDto.lastName,
            thirdDto.firstName,
            thirdDto.dob,
            thirdDto.iban,
            thirdDto.id
        );
    }

    private static enumToModel (type: string): ThirdType {
        return ThirdType[type];
    }
    private static enumToDto (type: ThirdType): ThirdTypeDto {
        return ThirdTypeDto[type];
    }
    
}