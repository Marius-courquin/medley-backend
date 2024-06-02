import {LeaseInspection} from "@domain/entities/leaseInspection.entity";

export class LeaseInspectionClosedEvent {
    leaseInspection: LeaseInspection

    public static readonly eventName = 'leaseInspection.closed';

    constructor(leaseInspection: LeaseInspection) {
        this.leaseInspection = leaseInspection;
    }
}