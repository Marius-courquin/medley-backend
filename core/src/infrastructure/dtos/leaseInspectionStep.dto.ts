import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import {  LeaseInspectionStepStateDto } from "./enum/leaseInspectionStep.enum.dto";

export class LeaseInspectionStepDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsEnum(LeaseInspectionStepStateDto, { message: 'state must be a valid type' })
    @ApiProperty()
    state: LeaseInspectionStepStateDto;

    @IsString({ message: 'description must be a valid string' })
    @ApiProperty()
    description: string;

    @IsNumber({}, { message: 'rating must be a valid number' })
    @ApiProperty()
    rating: number;

    @IsUUID(4, { message: 'leaseInspectionId must be a valid uuid' })
    @ApiProperty()
    leaseInspectionId: string;

    constructor(state: LeaseInspectionStepStateDto, description: string, rating: number, leaseInspectionId: string, id?: string) {
        this.id = id ?? undefined;
        this.state = state;
        this.description = description;
        this.rating = rating;
        this.leaseInspectionId = leaseInspectionId;
    }

}