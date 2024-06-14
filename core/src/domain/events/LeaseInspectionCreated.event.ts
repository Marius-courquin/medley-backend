import {Estate} from "@domain/entities/estate.entity";
import {LeaseInspection} from "@domain/entities/leaseInspection.entity";

export class LeaseInspectionCreatedEvent {
    estate: Estate
    leaseInspection: LeaseInspection

    public static readonly eventName = 'leaseInspection.created';
    public static readonly eventMessage =
        'Lease inspection created and will be followed by the creation of a all steps and sub-steps';

    constructor(leaseInspection: LeaseInspection, estate: Estate) {
        this.leaseInspection = leaseInspection;
        this.estate = estate;
    }

    getEventEmbedFields() {
        return [
            {
                name: 'Lease inspection id',
                value: this.leaseInspection.id,
                inline: false
            },
            {
                name: 'Type',
                value: this.leaseInspection.type,
                inline: true
            },
            {
                name: 'State',
                value: this.leaseInspection.state,
                inline: true
            },
            {
                name: 'Lease id',
                value: this.leaseInspection.lease.id,
                inline: false
            },
            {
                name: 'Estate id',
                value: this.estate.id,
                inline: true
            }
        ]
    }
}