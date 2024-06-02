import {Injectable, NotFoundException} from '@nestjs/common';
import {LeaseRepository} from '@domain/repositories/lease.repository';
import {Agent} from '@domain/entities/agent.entity';
import {AgentRepository} from '@domain/repositories/agent.repository';
import {LeaseInspection} from '@domain/entities/leaseInspection.entity';
import {LeaseInspectionRepository} from '@domain/repositories/leaseInspection.repository';
import {LeaseInspectionDto} from '@infrastructure/dtos/leaseInspection.dto';
import {LeaseInspectionDtoMapper} from '@infrastructure/mappers/leaseInspection.dto.mapper';
import {EventEmitter2} from "@nestjs/event-emitter";
import {LeaseInspectionCreatedEvent} from "@domain/events/leaseInspectionCreated.event";
import {Lease} from "@domain/entities/lease.entity";
import {LeaseInspectionStep} from "@domain/entities/leaseInspectionStep.entity";
import {LeaseInspectionStepRepository} from "@domain/repositories/leaseInspectionStep.repository";
import {ElementType} from "@domain/entities/enum/element.enum.entity";
import {LeaseInspectionStepService} from "@domain/services/leaseInspectionStep.service";
import {Room} from "@domain/entities/room.entity";
import {
    leaseInspectionContextCeilingDto,
    leaseInspectionContextDto,
    leaseInspectionContextFurnishingDto,
    leaseInspectionContextGroundDto,
    leaseInspectionContextRoomDto,
    leaseInspectionContextStairDto,
    leaseInspectionContextWallDto
} from "@infrastructure/dtos/leaseInspectionContext.dto";
import {RoomDtoMapper} from "@infrastructure/mappers/room.dto.mapper";
import {RoomRepository} from "@domain/repositories/room.repository";

@Injectable()
export class LeaseInspectionService {
    constructor(
        private readonly leaseRepository: LeaseRepository,
        private readonly agentRepository: AgentRepository,
        private readonly repository: LeaseInspectionRepository,
        private readonly eventEmitter: EventEmitter2,
        private readonly leaseInspectionStepRepository: LeaseInspectionStepRepository,
        private readonly leaseInspectionStepService: LeaseInspectionStepService,
        private readonly roomRepository: RoomRepository
    ) {}

    async create(leaseInspectionDto: LeaseInspectionDto): Promise<LeaseInspectionDto> {
        const agent : Agent  = await this.agentRepository.findById(leaseInspectionDto.agentId);
        const lease: Lease = await this.leaseRepository.findById(leaseInspectionDto.leaseId);
        if (!lease) {
            throw new NotFoundException('lease does not exist');
        }
        const leaseInspection = LeaseInspectionDtoMapper.toModel(leaseInspectionDto, lease, agent);
        const leaseInspectionCreated = await this.repository.save(leaseInspection);

        this.eventEmitter.emit(LeaseInspectionCreatedEvent.eventName, new LeaseInspectionCreatedEvent(leaseInspectionCreated, lease.getEstate()));

        return LeaseInspectionDtoMapper.fromModel(leaseInspectionCreated);
    }

    async getByLease(leaseId: string): Promise<LeaseInspectionDto[]> {
        const lease = await this.leaseRepository.findById(leaseId);
        if (!lease) {
            throw new NotFoundException('lease does not exist');
        }
        const leaseInspections: LeaseInspection[] = await this.repository.findByLease(leaseId);
        return leaseInspections.map(leaseInspection => LeaseInspectionDtoMapper.fromModel(leaseInspection));
    }

    async get(leaseId: string): Promise<LeaseInspectionDto> {
        const leaseInspection: LeaseInspection = await this.repository.findById(leaseId);
        if (!leaseInspection) {
            throw new NotFoundException('lease inspection does not exist');
        }
        return LeaseInspectionDtoMapper.fromModel(leaseInspection);
    }

    async update(leaseInspectionId: string, leaseInspectionDto: LeaseInspectionDto): Promise<LeaseInspectionDto> {
        leaseInspectionDto.id = leaseInspectionId;
        const agent = await this.agentRepository.findById(leaseInspectionDto.agentId);
        const lease = await this.leaseRepository.findById(leaseInspectionDto.leaseId);
        if (!lease) {
            throw new NotFoundException('lease does not exist');
        }
        const leaseInspection = LeaseInspectionDtoMapper.toModel(leaseInspectionDto, lease, agent);
        return LeaseInspectionDtoMapper.fromModel(await this.repository.updateElement(leaseInspection));
    }

    async close(leaseInspectionId: string): Promise<void> {
        const leaseInspection: LeaseInspection = await this.repository.findById(leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('lease inspection does not exist');
        }
        leaseInspection.close();
        await this.repository.updateElement(leaseInspection)
        return;
    }

    async getRelatedStepContext(leaseInspection: LeaseInspection,  elementType: ElementType, room: Room) {
        const leaseInspectionSteps: LeaseInspectionStep[] = await this.leaseInspectionStepRepository.findByLeaseInspectionAndElementTypeAndRoom(leaseInspection.id, elementType, room.id);
        const leaseInspectionsStepContexts = [];
        for (const leaseInspectionStep of leaseInspectionSteps) {
            leaseInspectionsStepContexts.push(await this.leaseInspectionStepService.getContext(leaseInspectionStep));
        }
        return leaseInspectionsStepContexts;
    }

    async getRoomContext(leaseInspection: LeaseInspection, room: Room) {
        const walls = await this.getRelatedStepContext(leaseInspection, ElementType.WALL, room) as leaseInspectionContextWallDto[];
        const ceiling = (await this.getRelatedStepContext(leaseInspection, ElementType.CEILING, room))[0] as leaseInspectionContextCeilingDto;
        const ground = (await this.getRelatedStepContext(leaseInspection, ElementType.GROUND, room))[0] as leaseInspectionContextGroundDto;
        const stairs = await this.getRelatedStepContext(leaseInspection, ElementType.STAIR, room) as leaseInspectionContextStairDto[];
        const furnishing = await this.getRelatedStepContext(leaseInspection, ElementType.FURNISHING, room) as leaseInspectionContextFurnishingDto[];

        const roomDto = RoomDtoMapper.fromModel(room);
        return new leaseInspectionContextRoomDto(roomDto, walls, ceiling, ground, stairs, furnishing);
    }

    async getContext(leaseInspectionId: string) {
        const leaseInspection: LeaseInspection = await this.repository.findById(leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('lease inspection does not exist');
        }

        const rooms = await this.roomRepository.findAllByEstate(leaseInspection.lease.getEstate().id);
        const leaseInspectionContextRooms = [];
        for (const room of rooms) {
            leaseInspectionContextRooms.push(await this.getRoomContext(leaseInspection, room));
        }

        const leaseInspectionDto = LeaseInspectionDtoMapper.fromModel(leaseInspection);
        return new leaseInspectionContextDto(leaseInspectionDto, leaseInspectionContextRooms);
    }


}
