import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { ThirdTypeDto } from "@infrastructure/dtos/enum/third.enum.dto";


export class ThirdDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the third',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id?: string;

    @IsEnum(ThirdTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the third',
        example: 'OWNER',
        enum: ThirdTypeDto
    })
    type: ThirdTypeDto;

    @IsString({ message: 'lastName must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The last name of the third',
        example: 'Doe'
    })
    lastName: string;

    @IsString({ message: 'firstName must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The first name of the third',
        example: 'John'
    })
    firstName: string;

    @IsDateString()
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The date of birth of the third',
        example: '2021-12-31T23:59:59Z'
    })
    dob: Date;

    @IsOptional()
    @IsString({ message: 'iban must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The iban of the third',
        example: 'FR7630006000011234567890189'
    })
    iban: string;

    constructor (id: string, type: ThirdTypeDto, lastName: string, firstName: string, dob: Date, iban: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.lastName = lastName;
        this.firstName = firstName;
        this.dob = dob;
        this.iban = iban;
    }
    
}
