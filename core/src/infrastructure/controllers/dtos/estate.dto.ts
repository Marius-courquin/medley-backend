import { ApiProperty } from "@nestjs/swagger";

export class EstateDto {
    @ApiProperty()
    streetNumber: string;

    @ApiProperty()
    streetName: string;

    @ApiProperty()
    zipCode: number;

    @ApiProperty()
    city: string;

    @ApiProperty()
    floor: number;

    @ApiProperty()
    flatNumber: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    livingSpace: number;

    @ApiProperty()
    roomCount: number;

    @ApiProperty()
    type: string;

    @ApiProperty()
    class: string;

    @ApiProperty()
    heaterType: string;

    @ApiProperty()
    waterHeaterType: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    ownerId: string;

    constructor (streetNumber: string, streetName: string, zipCode: number, city: string, floor: number, flatNumber: number, description: string, livingSpace: number, roomCount: number, type: string, classType: string, heaterType: string, waterHeaterType: string, createdAt: Date, ownerId: string) {
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
        this.createdAt = createdAt;
        this.ownerId = ownerId;
    }
}