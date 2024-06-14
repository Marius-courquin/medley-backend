import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { HasMimeType, IsFiles, MemoryStoredFile } from "nestjs-form-data";
import { LeaseInspectionSubStepStateDto } from "@infrastructure/dtos/enum/leaseInspectionSubStep.enum.dto";
import { SubElementDto } from "@infrastructure/dtos/subElement.dto";

export class LeaseInspectionSubStepWithFileDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        type: 'string',
        description: 'The id of the lease inspection step',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsEnum(LeaseInspectionSubStepStateDto, { message: 'state must be a valid type' })
    @ApiProperty({
        type: 'string',
        description: 'The state of the lease inspection sub step',
        example: 'PENDING',
        required: true,
        enum: LeaseInspectionSubStepStateDto
    })
    state: LeaseInspectionSubStepStateDto;

    @IsUUID(4, { message: 'subElementId must be a valid uuid' })
    @ApiProperty({
        type: 'string',
        description: 'The element of the lease inspection sub step',
        required: true,
    })
    subElementId: string;

    @IsString({ message: 'description must be a valid string' })
    @ApiProperty({
        type: 'string',
        description: 'The description of the lease inspection sub step',
        example: 'The kitchen is in a bad state',
        required: true,
    })
    description: string;

    @IsNumber({}, { message: 'rating must be a valid number' })
    @ApiProperty({
        type: 'number',
        description: 'The rating of the lease inspection sub step',
        example: 3,
        required: true,
    })
    rating: number;

    @IsUUID(4, { message: 'leaseInspectionId must be a valid uuid' })
    @ApiProperty({
        type: 'string',
        description: 'The id of the lease inspection sub step',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    leaseInspectionStepId: string;

    @IsFiles()
    @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'],  { each: true })
    @ApiProperty({
        required: true,
        type: 'file',
        description: 'The pictures of the lease Inspection Sub Step with the format jpeg, jpg or png',
        example: 'picture.png',
        pattern: 'image/jpeg | image/png | image/jpg',
    })
    pictures?: MemoryStoredFile[];

    constructor (state: LeaseInspectionSubStepStateDto, subElementId: string, description: string, rating: number, leaseInspectionStepId: string, pictures?: MemoryStoredFile[], id?: string) {
        this.id = id ?? undefined;
        this.state = state;
        this.subElementId = subElementId;
        this.description = description;
        this.rating = rating;
        this.leaseInspectionStepId = leaseInspectionStepId;
        this.pictures = pictures ?? undefined;
    }

}