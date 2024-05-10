import { IsCustomDate } from "@/shared/decorators/date.shared.decorator";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class LeaseDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id?: string;

    @IsNumber({}, { message: 'keyCount must be a valid number' })
    @ApiProperty()
    keyCount: number;

    @IsCustomDate({ message: 'startDate must be a valid date in YYYY-MM-DD format' })
    @ApiProperty({ type: String, format: 'date-time' })
    startDate: string;

    @IsCustomDate({ message: 'endDate must be a valid date in YYYY-MM-DD format' })
    @ApiProperty({ type: String, format: 'date-time' })
    endDate: string;

    @IsUUID(4, { message: 'estateId must be a valid uuid' })
    @ApiProperty()
    estateId: string;

    @IsOptional()
    @IsUUID(4, { message: 'agentId must be a valid uuid' })
    @ApiProperty()
    agentId?: string;

    @IsUUID(4, { message: 'tenantId must be a valid uuid' })
    @ApiProperty()
    tenantId: string;

    constructor(keyCount: number, startDate: string, endDate: string, estateId: string, tenantId: string, agentId?: string, id?: string) {
        this.id = id ?? undefined;
        this.keyCount = keyCount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.estateId = estateId;
        this.agentId = agentId ?? undefined;
        this.tenantId = tenantId;
    }
}
