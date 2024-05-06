import { LeaseInspectionStepDto } from '@infrastructure/dtos/leaseInspectionStep.dto';
import { LeaseInspectionStepState } from '@domain/entities/enum/leaseInspectionStep.enum.entity';
import { LeaseInspectionStepStateDto } from '@infrastructure/dtos/enum/leaseInspectionStep.enum.dto';
import { LeaseInspection } from '@domain/entities/leaseInspection.entity';
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';

export class LeaseInspectionStepDtoMapper {
    public static fromModel(leaseInspectionStep : LeaseInspectionStep) : LeaseInspectionStepDto {
        return new LeaseInspectionStepDto(
            this.leaseInspectionStepStateFromModel(leaseInspectionStep.state),
            leaseInspectionStep.description,
            leaseInspectionStep.rating,
            leaseInspectionStep.leaseInspection.id,
            leaseInspectionStep.id
        );
    }

    public static toModel(leaseInspectionStepDto : LeaseInspectionStepDto, leaseInspection: LeaseInspection) : LeaseInspectionStep {
        return new LeaseInspectionStep(
            this.leaseInspectionStepStateToModel(leaseInspectionStepDto.state),
            leaseInspectionStepDto.rating,
            leaseInspectionStepDto.description,
            leaseInspection,
            leaseInspectionStepDto.id
        );
    }

    private static leaseInspectionStepStateFromModel(state: LeaseInspectionStepState): LeaseInspectionStepStateDto {
        return LeaseInspectionStepStateDto[state];
    }

    private static leaseInspectionStepStateToModel(state: LeaseInspectionStepStateDto): LeaseInspectionStepState {
        return LeaseInspectionStepState[state];
    }

}
