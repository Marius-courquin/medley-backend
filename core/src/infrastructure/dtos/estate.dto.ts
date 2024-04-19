import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ClassTypeDto, EstateTypeDto, HeaterTypeDto, WaterHeaterTypeDto } from "@infrastructure/dtos/enum/estate.enum.dto";
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

    @IsEnum(EstateTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: EstateTypeDto;

    @IsEnum(ClassTypeDto, { message: 'class must be a valid string' })
    @ApiProperty()
    class: ClassTypeDto;

    @IsEnum(HeaterTypeDto, { message: 'heaterType must be a valid string' })
    @ApiProperty()
    heaterType: HeaterTypeDto;

    @IsEnum(WaterHeaterTypeDto, { message: 'waterHeaterType must be a valid string' })
    @ApiProperty()
    waterHeaterType: WaterHeaterTypeDto;

    @IsUUID(4, { message: 'ownerId must be a valid uuid' })
    @ApiProperty()
    ownerId: string;

    constructor (id: string, streetNumber: string, streetName: string, zipCode: number, city: string, floor: number, flatNumber: number, description: string, livingSpace: number, roomCount: number, type: EstateTypeDto, classType: ClassTypeDto, heaterType: HeaterTypeDto, waterHeaterType: WaterHeaterTypeDto, ownerId: string) {
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