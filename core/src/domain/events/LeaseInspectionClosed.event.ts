import {LeaseInspection} from "@domain/entities/leaseInspection.entity";

export class LeaseInspectionClosedEvent {
    leaseInspection: LeaseInspection

    public static readonly eventName = 'leaseInspection.closed';
    public static readonly eventMessage =
        'Lease inspection closed and will be followed by the creation of a check-out inspection';

    constructor(leaseInspection: LeaseInspection) {
        this.leaseInspection = leaseInspection;
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
            }
        ]
    }
}