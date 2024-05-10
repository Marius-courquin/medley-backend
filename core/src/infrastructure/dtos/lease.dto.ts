import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsUUID } from "class-validator";

export class LeaseDto {

    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the lease',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsNumber({}, { message: 'keyCount must be a valid number' })
    @ApiProperty({
        required: true,
        type: 'number',
        description: 'The number of keys',
        example: 2,
    })
    keyCount: number;

    @IsDateString()
    @ApiProperty({
        type: String,
        format: 'date-time',
        description: 'The start date of the lease',
        example: '2021-01-01T00:00:00.000Z',
        required: true,
    })
    startDate: Date;

    @IsDateString()
    @ApiProperty({
        type: String,
        format: 'date-time',
        description: 'The end date of the lease',
        example: '2021-12-31T23:59:59.999Z',
        required: true,
    })
    endDate: Date;

    @IsUUID(4, { message: 'estateId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the estate',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    estateId: string;

    @IsOptional()
    @IsUUID(4, { message: 'agentId must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the agent',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    agentId?: string;

    @IsUUID(4, { message: 'tenantId must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the tenant which is a third',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    tenantId: string;

    constructor(keyCount: number, startDate: Date, endDate: Date, estateId: string, tenantId: string, agentId?: string, id?: string) {
        this.id = id ?? undefined;
        this.keyCount = keyCount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.estateId = estateId;
        this.agentId = agentId ?? undefined;
        this.tenantId = tenantId;
    }
}
