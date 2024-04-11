import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
export class EstateDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsString({ message: 'streetNumber must be a valid string' })
    @ApiProperty()
    streetNumber: string;

    @IsString({ message: 'streetName must be a valid string' })
    @ApiProperty()
    streetName: string;

    @IsNumber({}, { message: 'zipCode must be a valid number' })
    @ApiProperty()
    zipCode: number;

    @IsString({ message: 'city must be a valid string' })
    @ApiProperty()
    city: string;

    @IsNumber({}, { message: 'floor must be a valid number' })
    @ApiProperty()
    floor: number;

    @IsNumber({}, { message: 'flatNumber must be a valid number' })
    @ApiProperty()
    flatNumber: number;

    @IsString({ message: 'description must be a valid string' })
    @ApiProperty()
    description: string;

    @IsNumber({}, { message: 'livingSpace must be a valid number' })
    @ApiProperty()
    livingSpace: number;

    @IsNumber({}, { message: 'roomCount must be a valid number' })
    @ApiProperty()
    roomCount: number;

    @IsString({ message: 'type must be a valid string' })
    @ApiProperty()
    type: string;

    @IsString({ message: 'class must be a valid string' })
    @ApiProperty()
    class: string;

    @IsString({ message: 'heaterType must be a valid string' })
    @ApiProperty()
    heaterType: string;

    @IsString({ message: 'waterHeaterType must be a valid string' })
    @ApiProperty()
    waterHeaterType: string;

    @IsString({ message: 'ownerId must be a valid string' })
    @ApiProperty()
    ownerId: string;

    constructor (id: string, streetNumber: string, streetName: string, zipCode: number, city: string, floor: number, flatNumber: number, description: string, livingSpace: number, roomCount: number, type: string, classType: string, heaterType: string, waterHeaterType: string, ownerId: string) {
        this.id = id ?? undefined;
        this.streetNumber = streetNumber;
        this.streetName = streetName;
        this.zipCode = zipCode;
        this.city = city;
        this.floor = floor;
        this.flatNumber = flatNumber;
        this.description = description;
        this.livingSpace = livingSpace;
        this.roomCount = roomCount;
        this.type = type;
        this.class = classType;
        this.heaterType = heaterType;
        this.waterHeaterType = waterHeaterType;
        this.ownerId = ownerId;
    }
}