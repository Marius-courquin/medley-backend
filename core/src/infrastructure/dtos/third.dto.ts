import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { ThirdType } from "@infrastructure/dtos/types/third.type";


export class ThirdDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @IsEnum(ThirdType, { message: 'type must be a valid type' })
    @ApiProperty()
    type: string;

    @IsString({ message: 'lastName must be a valid string' })
    @ApiProperty()
    lastName: string;

    @IsString({ message: 'firstName must be a valid string' })
    @ApiProperty()
    firstName: string;

    @IsDateString()
    @ApiProperty()
    dob: Date;

    @IsOptional()
    @IsString({ message: 'iban must be a valid string' })
    @ApiProperty()
    iban: string;

    constructor (id: string, type: string, lastName: string, firstName: string, dob: Date, iban: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.lastName = lastName;
        this.firstName = firstName;
        this.dob = dob;
        this.iban = iban;
    }
    
}
