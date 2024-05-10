import { LeaseInspectionDto } from '@infrastructure/dtos/leaseInspection.dto';
import { LeaseInspectionType, LeaseInspectionState } from '@domain/entities/enum/leaseInspection.enum.entity';
import { LeaseInspectionTypeDto, LeaseInspectionStateDto } from '@infrastructure/dtos/enum/leaseInspection.enum.dto';
import { LeaseInspection } from '@domain/entities/leaseInspection.entity';
import { Lease } from '@domain/entities/lease.entity';
import { Agent } from '@domain/entities/agent.entity';

export class LeaseInspectionDtoMapper {
    public static fromModel(leaseInspection : LeaseInspection) : LeaseInspectionDto {
        return new LeaseInspectionDto(
            this.leaseInspectionTypeFromModel(leaseInspection.type),
            this.leaseInspectionStateFromModel(leaseInspection.state),
            leaseInspection.endDate.toISOString().slice(0, 10),
            leaseInspection.lease.id,
            leaseInspection.agent.id,
            leaseInspection.id
        );
    }

    public static toModel(leaseInspectionDto : LeaseInspectionDto, lease: Lease, agent: Agent) : LeaseInspection {
        return new LeaseInspection(
            this.leaseInspectionTypeToModel(leaseInspectionDto.type),
            this.leaseInspectionStateToModel(leaseInspectionDto.state),
            new Date(leaseInspectionDto.endDate),
            lease,
            agent,
            leaseInspectionDto.id
        );
    }

    private static leaseInspectionTypeFromModel(type: LeaseInspectionType): LeaseInspectionTypeDto {
        return LeaseInspectionTypeDto[type];
    }

    private static leaseInspectionStateFromModel(state: LeaseInspectionState): LeaseInspectionStateDto {
        return LeaseInspectionStateDto[state];
    }

    private static leaseInspectionTypeToModel(type: LeaseInspectionTypeDto): LeaseInspectionType {
        return LeaseInspectionType[type];
    }

    private static leaseInspectionStateToModel(state: LeaseInspectionStateDto): LeaseInspectionState {
        return LeaseInspectionState[state];
    }

}
