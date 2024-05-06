import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional, IsUUID } from "class-validator";
import { LeaseInspectionStateDto, LeaseInspectionTypeDto } from "./enum/leaseInspection.enum.dto";

export class LeaseInspectionDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsEnum(LeaseInspectionTypeDto, { message: 'type must be a valid type' })
    @ApiProperty()
    type: LeaseInspectionTypeDto;

    @IsEnum(LeaseInspectionStateDto, { message: 'state must be a valid type' })
    @ApiProperty()
    state: LeaseInspectionStateDto;

    @IsDateString()
    @ApiProperty()
    endDate: Date;

    @IsUUID(4, { message: 'leaseId must be a valid uuid' })
    @ApiProperty()
    leaseId: string;

    @IsOptional()
    @IsUUID(4, { message: 'agentId must be a valid uuid' })
    @ApiProperty()
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