import {Injectable} from "@nestjs/common";
import {LeaseInspectionCreatedEvent} from "@domain/events/LeaseInspectionCreated.event";
import {EventEmitter2, OnEvent} from "@nestjs/event-emitter";
import {RoomRepository} from "@domain/repositories/room.repository";
import {ElementRepository} from "@domain/repositories/element.repository";
import {LeaseInspectionStepRepository} from "@domain/repositories/leaseInspectionStep.repository";
import {LeaseInspectionStep} from "@domain/entities/leaseInspectionStep.entity";
import {LeaseInspectionStepState} from "@domain/entities/enum/leaseInspectionStep.enum.entity";
import {
    ElementCreatedOnLeaseInspectionCreationEvent
} from "@domain/events/ElementCreatedOnLeaseInspectionCreation.event";
import {DiscordNotificationAdapter} from "@infrastructure/adapters/DiscordNotificationAdapter";

@Injectable()
export class LeaseInspectionCreatedListener {
    constructor(
        private readonly roomRepository: RoomRepository,
        private readonly elementRepository: ElementRepository,
        private readonly leaseInspectionStepRepository: LeaseInspectionStepRepository,
        private readonly eventEmitter: EventEmitter2,
        private readonly notificationService: DiscordNotificationAdapter
    ) {
    }

    @OnEvent(LeaseInspectionCreatedEvent.eventName, {async: true})
    async handleLeaseInspectionCreatedEvent(event: LeaseInspectionCreatedEvent) {
        const rooms = await this.roomRepository.findAllByEstate(event.estate.id);
        for (const room of rooms) {
            const elements = await this.elementRepository.findByRoom(room.id);
            for (const element of elements) {
                const leaseInspectionStepCreated = await this.leaseInspectionStepRepository.save(new LeaseInspectionStep(LeaseInspectionStepState.PENDING, event.leaseInspection, element));
                this.eventEmitter.emit(ElementCreatedOnLeaseInspectionCreationEvent.eventName, new ElementCreatedOnLeaseInspectionCreationEvent(leaseInspectionStepCreated));
            }
        }
        await this.notificationService.pushEmbed(this.notificationService.buildEventEmbed(LeaseInspectionCreatedEvent.eventName, LeaseInspectionCreatedEvent.eventMessage, event.getEventEmbedFields()));
    }
}