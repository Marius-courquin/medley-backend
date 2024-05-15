import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { LeaseInspectionStateDto, LeaseInspectionTypeDto } from "@infrastructure/dtos/enum/leaseInspection.enum.dto";
import { IsCustomDate } from "@shared/decorators/date.shared.decorator";

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

    @IsCustomDate({ message: 'endDate must be a valid date in YYYY-MM-DD format' })
    @ApiProperty()
    endDate: string;

    @IsUUID(4, { message: 'leaseId must be a valid uuid' })
    @ApiProperty()
    leaseId: string;

    @IsOptional()
    @IsUUID(4, { message: 'agentId must be a valid uuid' })
    @ApiProperty()
    agentId?: string;

    constructor(type: LeaseInspectionTypeDto, state: LeaseInspectionStateDto, endDate: string, leaseId: string, agentId?: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.state = state;
        this.endDate = endDate;
        this.leaseId = leaseId;
        this.agentId = agentId ?? undefined;
    }

}