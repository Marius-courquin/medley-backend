import { LeaseInspectionSubStep } from '@domain/entities/leaseInspectionSubStep.entity';
import { LeaseInspectionSubStepState } from '@domain/entities/enum/leaseInspectionSubStep.enum.entity';
import { LeaseInspectionSubStepStateDto } from '@infrastructure/dtos/enum/leaseInspectionSubStep.enum.dto';
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';
import { LeaseInspectionSubStepDto } from '@infrastructure/dtos/leaseInspectionSubStep.dto';

export class LeaseInspectionSubStepDtoMapper {
    public static fromModel(leaseInspectionStep : LeaseInspectionSubStep) : LeaseInspectionSubStepDto {
        return new LeaseInspectionSubStepDto(
            this.leaseInspectionSubStepStateFromModel(leaseInspectionStep.state),
            leaseInspectionStep.description,
            leaseInspectionStep.rating,
            leaseInspectionStep.leaseInspectionStep.id,
            leaseInspectionStep.id
        );
    }

    public static toModel(leaseInspectionSubStepDto : LeaseInspectionSubStepDto, leaseInspectionStep: LeaseInspectionStep) : LeaseInspectionSubStep {
        return new LeaseInspectionSubStep(
            this.leaseInspectionSubStepStateToModel(leaseInspectionSubStepDto.state),
            leaseInspectionSubStepDto.rating,
            leaseInspectionSubStepDto.description,
            leaseInspectionStep,
            leaseInspectionSubStepDto.id
        );
    }

    private static leaseInspectionSubStepStateFromModel(state: LeaseInspectionSubStepState): LeaseInspectionSubStepStateDto {
        return LeaseInspectionSubStepStateDto[state];
    }

    private static leaseInspectionSubStepStateToModel(state: LeaseInspectionSubStepStateDto): LeaseInspectionSubStepState {
        return LeaseInspectionSubStepState[state];
    }

}
