import { LeaseDto } from "@infrastructure/dtos/lease.dto";
import { Lease } from "@domain/entities/lease.entity";
import { Estate } from "@domain/entities/estate.entity";
import { Third } from "@domain/entities/third.entity";
import { Agent } from "@domain/entities/agent.entity";

export class LeaseDtoMapper {

    static fromModel(lease: Lease): LeaseDto {
        return new LeaseDto(
            lease.keyCount,
            lease.startDate.toISOString().slice(0, 10),
            lease.endDate.toISOString().slice(0, 10),
            lease.estate.id,
            lease.agent.id,
            lease.tenant.id,
            lease.id
        );
    }

    static toModel(leaseDto: LeaseDto, estate: Estate, agent: Agent, tenant: Third): Lease {
        return new Lease(
            leaseDto.keyCount,
            new Date(leaseDto.startDate),
            new Date(leaseDto.endDate),
            estate,
            agent,
            tenant,
            leaseDto.id
        );

    }
}
