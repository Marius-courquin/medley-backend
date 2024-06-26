import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import {  LeaseInspectionStepStateDto } from "@infrastructure/dtos/enum/leaseInspectionStep.enum.dto";
import { PictureDto } from  "@infrastructure/dtos/picture.dto";
import { ElementDto } from "@infrastructure/dtos/element.dto";

export class LeaseInspectionStepWithLinkDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        type: 'string',
        description: 'The id of the lease inspection step',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsEnum(LeaseInspectionStepStateDto, { message: 'state must be a valid type' })
    @ApiProperty({
        type: 'string',
        description: 'The state of the lease inspection step',
        example: 'PENDING',
        required: true,
        enum: LeaseInspectionStepStateDto
    })
    state: LeaseInspectionStepStateDto;

    @ApiProperty({
        type: ElementDto,
        description: 'The element of the lease inspection step',
        required: true,
    })
    element: ElementDto;

    @IsString({ message: 'description must be a valid string' })
    @ApiProperty({
        type: 'string',
        description: 'The description of the lease inspection step',
        example: 'The kitchen is in a bad state',
        required: true,
    })
    description: string;

    @IsNumber({}, { message: 'rating must be a valid number' })
    @ApiProperty({
        type: 'number',
        description: 'The rating of the lease inspection step',
        example: 3,
        required: true,
    })
    rating: number;

    @IsUUID(4, { message: 'leaseInspectionId must be a valid uuid' })
    @ApiProperty({
        type: 'string',
        description: 'The id of the lease inspection',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    leaseInspectionId: string;

    @ApiProperty({
        required: true,
        type: PictureDto,
        isArray: true,
        description: 'Contains the links and ids of the pictures ',
        example: '[ {"id": "123e4567-e89b-12d3-a456-426614174000", "url": "https://example.com/picture.jpg" } ]',
    })
    pictures?: PictureDto[];

    constructor (state: LeaseInspectionStepStateDto, rating: number, description: string, element: ElementDto, leaseInspectionId: string, id?: string, pictures?: PictureDto[]) {
        this.id = id ?? undefined;
        this.state = state;
        this.rating = rating;
        this.description = description;
        this.element = element;
        this.leaseInspectionId = leaseInspectionId;
        this.pictures = pictures ?? undefined;
    }

}