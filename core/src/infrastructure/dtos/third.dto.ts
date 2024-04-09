import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsOptional, IsString, IsUUID } from "class-validator";


export class ThirdDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @IsString({ message: 'type must be a valid string' })
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
