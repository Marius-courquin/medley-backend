import {Estate} from "@domain/entities/estate.entity";
import {LeaseInspection} from "@domain/entities/leaseInspection.entity";

export class LeaseInspectionCreatedEvent {
    estate: Estate
    leaseInspection: LeaseInspection

    public static readonly eventName = 'leaseInspection.created';

    constructor(leaseInspection: LeaseInspection, estate: Estate) {
        this.leaseInspection = leaseInspection;
        this.estate = estate;
    }
}