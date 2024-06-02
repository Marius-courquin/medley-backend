import {Injectable} from "@nestjs/common";
import {EventEmitter2, OnEvent} from "@nestjs/event-emitter";
import {LeaseInspectionClosedEvent} from "@domain/events/leaseInspectionClosed.event";
import {LeaseInspectionRepository} from "@domain/repositories/leaseInspection.repository";
import {LeaseInspection} from "@domain/entities/leaseInspection.entity";
import {LeaseInspectionState, LeaseInspectionType} from "@domain/entities/enum/leaseInspection.enum.entity";
import {LeaseInspectionCreatedEvent} from "@domain/events/leaseInspectionCreated.event";

@Injectable()
export class LeaseInspectionClosedListener {
    constructor(
        private readonly leaseInspectionRepository: LeaseInspectionRepository,
        private readonly eventEmitter: EventEmitter2
    ) {
    }

    @OnEvent(LeaseInspectionClosedEvent.eventName, {async: true})
    async handleLeaseInspectionCreatedEvent(event: LeaseInspectionClosedEvent) {
        if (event.leaseInspection.isCheckIn()) {
            const leaseInspectionCheckOut = new LeaseInspection(
                LeaseInspectionType.CHECK_OUT,
                LeaseInspectionState.PENDING,
                event.leaseInspection.lease.endDate,
                event.leaseInspection.lease,
                event.leaseInspection.agent
            );
            const leaseInspectionCreated = await this.leaseInspectionRepository.save(leaseInspectionCheckOut);
            this.eventEmitter.emit(LeaseInspectionCreatedEvent.eventName, new LeaseInspectionCreatedEvent(leaseInspectionCreated, event.leaseInspection.lease.estate));
        }

    }
}