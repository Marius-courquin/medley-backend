import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import {  LeaseInspectionSubStepStateDto } from "@infrastructure/dtos/enum/leaseInspectionSubStep.enum.dto";

export class LeaseInspectionSubStepDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        type: 'string',
        description: 'The id of the lease inspection sub step',
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

    @IsUUID(4, { message: 'leaseInspectionStepId must be a valid uuid' })
    @ApiProperty({
        type: 'string',
        description: 'The id of the lease inspection step',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    leaseInspectionStepId: string;

    constructor(state: LeaseInspectionSubStepStateDto, description: string, rating: number, leaseInspectionStepId: string, id?: string) {
        this.id = id ?? undefined;
        this.state = state;
        this.description = description;
        this.rating = rating;
        this.leaseInspectionStepId = leaseInspectionStepId;
    }
}