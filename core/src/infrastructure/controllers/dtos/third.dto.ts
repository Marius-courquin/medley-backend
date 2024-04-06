import { ApiProperty } from "@nestjs/swagger";

export class ThirdDto {
    @ApiProperty()
    type: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    dob: Date;

    @ApiProperty()
    iban: string;

    constructor (type: string, lastName: string, firstName: string, dob: Date, iban: string) {
        this.type = type;
        this.lastName = lastName;
        this.firstName = firstName;
        this.dob = dob;
        this.iban = iban;
    }
}
