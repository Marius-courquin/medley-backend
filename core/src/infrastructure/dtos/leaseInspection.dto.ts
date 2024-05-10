import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional, IsUUID } from "class-validator";
import { LeaseInspectionStateDto, LeaseInspectionTypeDto } from "./enum/leaseInspection.enum.dto";

export class LeaseInspectionDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the lease inspection',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id?: string;

    @IsEnum(LeaseInspectionTypeDto, { message: 'type must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The type of the lease inspection',
        example: 'CHECK_OUT',
        enum: LeaseInspectionTypeDto
    })
    type: LeaseInspectionTypeDto;

    @IsEnum(LeaseInspectionStateDto, { message: 'state must be a valid type' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The state of the lease inspection',
        example: 'PENDING',
        enum: LeaseInspectionStateDto
    })
    state: LeaseInspectionStateDto;

    @IsDateString()
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The end date of the lease inspection',
        example: '2021-12-31T23:59:59Z'
    })
    endDate: Date;

    @IsUUID(4, { message: 'leaseId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the lease',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    leaseId: string;

    @IsOptional()
    @IsUUID(4, { message: 'agentId must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the agent',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    agentId?: string;

    constructor(type: LeaseInspectionTypeDto, state: LeaseInspectionStateDto, endDate: Date, leaseId: string, agentId?: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.state = state;
        this.endDate = endDate;
        this.leaseId = leaseId;
        this.agentId = agentId ?? undefined;
    }

}