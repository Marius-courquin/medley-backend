import { LeaseInspectionService } from '@domain/services/leaseInspection.service';
import { LeaseInspectionCreationOnLeaseCreationEvent } from '@domain/events/LeaseInspectionCreationOnLeaseCreation.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LeaseInspectionStateDto, LeaseInspectionTypeDto } from '@infrastructure/dtos/enum/leaseInspection.enum.dto';
import { LeaseInspectionDto } from '@infrastructure/dtos/leaseInspection.dto';
import {DiscordNotificationAdapter} from "@infrastructure/adapters/DiscordNotificationAdapter";

@Injectable()
export class LeaseInspectionCreationOnLeaseCreationListener {
    constructor(
        private readonly leaseInspectionService: LeaseInspectionService,
        private readonly notificationService: DiscordNotificationAdapter
    ) {
    }

    @OnEvent(LeaseInspectionCreationOnLeaseCreationEvent.eventName, { async: true })
    async handleElementCreatedOnLeaseInspectionCreationEvent(event: LeaseInspectionCreationOnLeaseCreationEvent ) {
        const leaseInspectionDto: LeaseInspectionDto = new LeaseInspectionDto( LeaseInspectionTypeDto.CHECK_IN, LeaseInspectionStateDto.PENDING, event.lease.id, event.lease.endDate, event.lease.agent.id);
        await this.notificationService.pushEmbed(this.notificationService.buildEventEmbed(LeaseInspectionCreationOnLeaseCreationEvent.eventName, LeaseInspectionCreationOnLeaseCreationEvent.eventMessage, event.getEventEmbedFields()));
        await this.leaseInspectionService.create(leaseInspectionDto);
    }
}