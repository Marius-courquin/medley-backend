import { LeaseInspectionDto } from '@infrastructure/dtos/leaseInspection.dto';
import { LeaseInspectionType, LeaseInspectionState } from '@domain/entities/enum/leaseInspection.enum.entity';
import { LeaseInspectionTypeDto, LeaseInspectionStateDto } from '@infrastructure/dtos/enum/leaseInspection.enum.dto';
import { LeaseInspection } from '@domain/entities/leaseInspection.entity';
import { Lease } from '@domain/entities/lease.entity';
import { Agent } from '@domain/entities/agent.entity';
import { Signature } from '@domain/entities/signature.entity';
import {SignatureWithLinkDto} from "@infrastructure/dtos/signatureWithLink.dto";

export class LeaseInspectionDtoMapper {
    public static fromModel(leaseInspection : LeaseInspection, agentSignature?: SignatureWithLinkDto, tenantSignature?: SignatureWithLinkDto) : LeaseInspectionDto {
        return new LeaseInspectionDto(
            this.leaseInspectionTypeFromModel(leaseInspection.type),
            this.leaseInspectionStateFromModel(leaseInspection.state),
            leaseInspection.lease.id,
            leaseInspection.endDate,
            leaseInspection.agent.id,
            agentSignature ?? undefined,
            tenantSignature ?? undefined,
            leaseInspection.id
        );
    }

    public static toModel(
        leaseInspectionDto : LeaseInspectionDto, 
        lease: Lease, 
        agent: Agent, 
        agentSignature?: Signature,
        thirdSignature?: Signature,
    ) : LeaseInspection {
        return new LeaseInspection(
            this.leaseInspectionTypeToModel(leaseInspectionDto.type),
            this.leaseInspectionStateToModel(leaseInspectionDto.state),
            leaseInspectionDto.endDate,
            lease,
            agent,
            leaseInspectionDto.id,
            agentSignature,
            thirdSignature,
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
