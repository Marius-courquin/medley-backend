import {Injectable} from "@nestjs/common";
import {OnEvent} from "@nestjs/event-emitter";
import {SubElementRepository} from "@domain/repositories/subElement.repository";
import {LeaseInspectionSubStepRepository} from "@domain/repositories/leaseInspectionSubStep.repository";
import {
    ElementCreatedOnLeaseInspectionCreationEvent
} from "@domain/events/ElementCreatedOnLeaseInspectionCreation.event";
import {LeaseInspectionSubStep} from "@domain/entities/leaseInspectionSubStep.entity";
import {LeaseInspectionSubStepState} from "@domain/entities/enum/leaseInspectionSubStep.enum.entity";

@Injectable()
export class ElementCreatedOnLeaseInspectionCreationListener {
    constructor(
        private readonly subElementRepository: SubElementRepository,
        private readonly leaseInspectionSubStepRepository: LeaseInspectionSubStepRepository,
    ) {
    }

    @OnEvent(ElementCreatedOnLeaseInspectionCreationEvent.eventName, {async: true})
    async handleElementCreatedOnLeaseInspectionCreationEvent(event: ElementCreatedOnLeaseInspectionCreationEvent) {
        const subElements = await this.subElementRepository.findByElement(event.leaseInspectionStep.element.id);
        for (const subElement of subElements) {
            await this.leaseInspectionSubStepRepository.save(new LeaseInspectionSubStep(LeaseInspectionSubStepState.PENDING, event.leaseInspectionStep, subElement));
        }
    }
}