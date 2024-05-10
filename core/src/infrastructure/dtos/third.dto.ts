import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { ThirdTypeDto } from "@infrastructure/dtos/enum/third.enum.dto";
import { IsCustomDate } from "@shared/decorators/date.shared.decorator";


export class ThirdDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsEnum(ThirdTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: ThirdTypeDto;

    @IsString({ message: 'lastName must be a valid string' })
    @ApiProperty()
    lastName: string;

    @IsString({ message: 'firstName must be a valid string' })
    @ApiProperty()
    firstName: string;

    @IsCustomDate({ message: 'dob must be a valid date in YYYY-MM-DD format' })
    @ApiProperty()
    dob: string;

    @IsOptional()
    @IsString({ message: 'iban must be a valid string' })
    @ApiProperty()
    iban: string;

    constructor (id: string, type: ThirdTypeDto, lastName: string, firstName: string, dob: string, iban: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.lastName = lastName;
        this.firstName = firstName;
        this.dob = dob;
        this.iban = iban;
    }
    
}
