import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ClassTypeDto, EstateTypeDto, HeaterTypeDto, WaterHeaterTypeDto } from "@infrastructure/dtos/enum/estate.enum.dto";

export class EstateWithLinkDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the estate',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsString({ message: 'name must be a valid string' })
    @ApiProperty({
        type: 'string',
        description: 'The name of the estate',
        example: 'Beautiful house in Grazy Groove',
        required: true,
    })
    name: string;

    @IsString({ message: 'streetNumber must be a valid string' })
    @ApiProperty({
        type: 'string',
        description: 'The street number of the estate',
        example: '12',
        required: true,
    })
    streetNumber: string;

    @IsString({ message: 'streetName must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The street name of the estate',
        example: 'Rue du test',
    })
    streetName: string;

    @IsNumber({}, { message: 'zipCode must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The zip code of the estate',
        example: 12345,
    })
    zipCode: number;

    @IsString({ message: 'city must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The city of the estate',
        example: 'Paris',
    })
    city: string;

    @IsNumber({}, { message: 'floor must be a valid number' })
    @ApiProperty({
        required: true,
        nullable: true,
        type: 'number',
        description: 'The floor of the estate',
        example: 1,
    })
    floor: number;

    @IsNumber({}, { message: 'flatNumber must be a valid number' })
    @ApiProperty({
        required: true,
        nullable: true,
        type: 'number',
        description: 'The flat number of the estate',
        example: 1,
    })
    flatNumber: number;

    @IsString({ message: 'description must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The description of the estate',
        example: 'This is a test',
    })
    description: string;

    @IsNumber({}, { message: 'livingSpace must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The living space of the estate',
        example: 100,
    })
    livingSpace: number;

    @IsNumber({}, { message: 'roomCount must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The room count of the estate',
        example: 4,
    })
    roomCount: number;

    @IsEnum(EstateTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the estate',
        example: 'HOUSE',
        enum: EstateTypeDto,
    })
    type: EstateTypeDto;

    @IsEnum(ClassTypeDto, { message: 'class must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The class of the estate',
        example: 'T1',
        enum: ClassTypeDto,
    })
    class: ClassTypeDto;

    @IsEnum(HeaterTypeDto, { message: 'heaterType must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The heater type of the estate',
        example: 'ELECTRIC',
        enum: HeaterTypeDto,
    })
    heaterType: HeaterTypeDto;

    @IsEnum(WaterHeaterTypeDto, { message: 'waterHeaterType must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The water heater type of the estate',
        example: 'ELECTRIC',
        enum: WaterHeaterTypeDto,
    })
    waterHeaterType: WaterHeaterTypeDto;

    @IsUUID(4, { message: 'ownerId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the owner of the estate',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    ownerId: string;

    @IsString({ message: 'picture link must be a valid string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The link of the picture of the estate',
        example: 'https://medley-minio.m-w-s.fr/pictures/estate/123e4567-e89b-12d3-a456-426614174000',
    })
    picture: string;

    constructor (id: string, name: string, streetNumber: string, streetName: string, zipCode: number, city: string, floor: number, flatNumber: number, description: string, livingSpace: number, roomCount: number, type: EstateTypeDto, classType: ClassTypeDto, heaterType: HeaterTypeDto, waterHeaterType: WaterHeaterTypeDto, ownerId: string, picture?: string) {
        this.id = id ?? undefined;
        this.name = name;
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
        this.picture = picture ? picture : undefined;
    }
}