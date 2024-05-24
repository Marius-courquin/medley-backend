import { LeaseInspectionStepWithLinkDto } from '@infrastructure/dtos/leaseInspectionStepWithLink.dto';
import { LeaseInspectionStepWithFileDto } from '@infrastructure/dtos/leaseInspectionStepWithFile.dto';
import { LeaseInspectionStepState } from '@domain/entities/enum/leaseInspectionStep.enum.entity';
import { LeaseInspectionStepStateDto } from '@infrastructure/dtos/enum/leaseInspectionStep.enum.dto';
import { ElementDtoMapper } from '@infrastructure/mappers/element.dto.mapper';
import { LeaseInspection } from '@domain/entities/leaseInspection.entity';
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';
import { PictureDto } from '@infrastructure/dtos/picture.dto';
import { Element } from '@domain/entities/element.entity';

export class LeaseInspectionStepDtoMapper {

    public static fromModelWithLink(leaseInspectionStep : LeaseInspectionStep, pictures : PictureDto[]) : LeaseInspectionStepWithLinkDto {
        return new LeaseInspectionStepWithLinkDto(
            this.leaseInspectionStepStateFromModel(leaseInspectionStep.state),
            leaseInspectionStep.rating,
            leaseInspectionStep.description,
            ElementDtoMapper.fromModel(leaseInspectionStep.element),
            leaseInspectionStep.leaseInspection.id,
            leaseInspectionStep.id,
            pictures
        );
    }


    public static toModel(leaseInspectionStepWithFileDto : LeaseInspectionStepWithFileDto , leaseInspection: LeaseInspection, element: Element) : LeaseInspectionStep {
        return new LeaseInspectionStep(
            this.leaseInspectionStepStateToModel(leaseInspectionStepWithFileDto.state),
            leaseInspection,
            element,
            leaseInspectionStepWithFileDto.rating,
            leaseInspectionStepWithFileDto.description,
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
