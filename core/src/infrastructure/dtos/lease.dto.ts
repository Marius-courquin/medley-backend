import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class LeaseDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsNumber({}, { message: 'keyCount must be a valid number' })
    @ApiProperty()
    keyCount: number;

    @IsDateString()
    @ApiProperty({ type: String, format: 'date-time' })
    startDate: Date;

    @IsDateString()
    @ApiProperty({ type: String, format: 'date-time' })
    endDate: Date;

    @IsUUID(4, { message: 'estateId must be a valid uuid' })
    @ApiProperty()
    estateId: string;

    @IsUUID(4, { message: 'agentId must be a valid uuid' })
    @ApiProperty()
    agentId: string;

    @IsUUID(4, { message: 'tenantId must be a valid uuid' })
    @ApiProperty()
    tenantId: string;

    constructor(id: string, keyCount: number, startDate: Date, endDate: Date, estateId: string, agentId: string, tenantId: string) {
        this.id = id ?? undefined;
        this.keyCount = keyCount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.estateId = estateId;
        this.agentId = agentId;
        this.tenantId = tenantId;
    }
}
