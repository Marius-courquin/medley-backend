
import { Lease } from "@domain/entities/lease.entity";

export class LeaseInspectionCreationOnLeaseCreationEvent {
    lease: Lease;

    public static readonly eventName = 'lease.created';
    public static readonly eventMessage =
        'Lease created and will be followed by the creation of a check-in lease inspection';

    constructor(lease: Lease) {
        this.lease = lease;
    }

    getEventEmbedFields() {
        return [
            {
                name: 'Lease id',
                value: this.lease.id,
                inline: false
            },
            {
                name: 'Agent id',
                value: this.lease.agent.id,
                inline: true
            }
        ]
    }
}