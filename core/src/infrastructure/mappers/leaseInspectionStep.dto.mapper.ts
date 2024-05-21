import { LeaseInspectionStepWithLinkDto } from '@infrastructure/dtos/leaseInspectionStepWithLink.dto';
import { LeaseInspectionStepWithFileDto } from '@infrastructure/dtos/leaseInspectionStepWithFile.dto';
import { LeaseInspectionStepState } from '@domain/entities/enum/leaseInspectionStep.enum.entity';
import { LeaseInspectionStepStateDto } from '@infrastructure/dtos/enum/leaseInspectionStep.enum.dto';
import { LeaseInspection } from '@domain/entities/leaseInspection.entity';
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';
import { PictureDto } from '@infrastructure/dtos/picture.dto';

export class LeaseInspectionStepDtoMapper {
    public static fromModelWithLink(leaseInspectionStep : LeaseInspectionStep, pictures : PictureDto[]) : LeaseInspectionStepWithLinkDto {
        return new LeaseInspectionStepWithLinkDto(
            this.leaseInspectionStepStateFromModel(leaseInspectionStep.state),
            leaseInspectionStep.description,
            leaseInspectionStep.rating,
            leaseInspectionStep.leaseInspection.id,
            leaseInspectionStep.id,
            pictures
        );
    }

    public static fromModelWithFile(leaseInspectionStep : LeaseInspectionStep) : LeaseInspectionStepWithFileDto {
        return new LeaseInspectionStepWithFileDto(
            this.leaseInspectionStepStateFromModel(leaseInspectionStep.state),
            leaseInspectionStep.description,
            leaseInspectionStep.rating,
            leaseInspectionStep.leaseInspection.id,
            leaseInspectionStep.id,
        );
    }


    public static toModel(leaseInspectionStepWithFileDto : LeaseInspectionStepWithFileDto , leaseInspection: LeaseInspection) : LeaseInspectionStep {
        return new LeaseInspectionStep(
            this.leaseInspectionStepStateToModel(leaseInspectionStepWithFileDto.state),
            leaseInspectionStepWithFileDto.rating,
            leaseInspectionStepWithFileDto.description,
            leaseInspection,
            leaseInspectionStepWithFileDto.id
        );
    }

    private static leaseInspectionStepStateFromModel(state: LeaseInspectionStepState): LeaseInspectionStepStateDto {
        return LeaseInspectionStepStateDto[state];
    }

    private static leaseInspectionStepStateToModel(state: LeaseInspectionStepStateDto): LeaseInspectionStepState {
        return LeaseInspectionStepState[state];
    }

}
