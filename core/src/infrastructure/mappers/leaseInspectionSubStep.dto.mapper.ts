
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';
import { PictureDto } from '@infrastructure/dtos/picture.dto';
import { LeaseInspectionSubStepWithLinkDto } from '@infrastructure/dtos/leaseInspectionSubStepWithLink.dto';
import { LeaseInspectionSubStepWithFileDto } from "@infrastructure/dtos/leaseInspectionSubStepWithFile.dto";
import { LeaseInspectionSubStep } from '@domain/entities/leaseInspectionSubStep.entity';
import { LeaseInspectionSubStepState } from '@domain/entities/enum/leaseInspectionSubStep.enum.entity';
import { LeaseInspectionSubStepStateDto } from '@infrastructure/dtos/enum/leaseInspectionSubStep.enum.dto';
import { SubElementDtoMapper } from '@infrastructure/mappers/subElement.dto.mapper';
import { SubElement } from '@domain/entities/subElement.entity';

export class LeaseInspectionSubStepDtoMapper {
    public static fromModelWithLink(leaseInspectionSubStep : LeaseInspectionSubStep, pictures : PictureDto[]) : LeaseInspectionSubStepWithLinkDto {
        return new LeaseInspectionSubStepWithLinkDto(
            this.leaseInspectionSubStepStateFromModel(leaseInspectionSubStep.state),
            SubElementDtoMapper.fromModel(leaseInspectionSubStep.subElement),
            leaseInspectionSubStep.description,
            leaseInspectionSubStep.rating,
            leaseInspectionSubStep.leaseInspectionStep.id,
            leaseInspectionSubStep.id,
            pictures
        );
    }

    public static toModel(leaseInspectionStepWithFileDto : LeaseInspectionSubStepWithFileDto , leaseInspectionStep: LeaseInspectionStep, subElement : SubElement) : LeaseInspectionSubStep {
        return new LeaseInspectionSubStep(
            this.leaseInspectionSubStepStateToModel(leaseInspectionStepWithFileDto.state),
            leaseInspectionStepWithFileDto.rating,
            leaseInspectionStepWithFileDto.description,
            leaseInspectionStep,
            subElement,
            leaseInspectionStepWithFileDto.id
        );
    }

    private static leaseInspectionSubStepStateFromModel(state: LeaseInspectionSubStepState): LeaseInspectionSubStepStateDto {
        return LeaseInspectionSubStepStateDto[state];
    }

    private static leaseInspectionSubStepStateToModel(state: LeaseInspectionSubStepStateDto): LeaseInspectionSubStepState {
        return LeaseInspectionSubStepState[state];
    }

}

