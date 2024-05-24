import {LeaseInspectionStep} from "@domain/entities/leaseInspectionStep.entity";

export class ElementCreatedOnLeaseInspectionCreationEvent {
    leaseInspectionStep: LeaseInspectionStep

    public static readonly eventName = 'element.created';

    constructor(leaseInspectionStep: LeaseInspectionStep) {
        this.leaseInspectionStep = leaseInspectionStep;
    }
}