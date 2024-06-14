import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {LeaseRepository} from '@domain/repositories/lease.repository';
import {Agent} from '@domain/entities/agent.entity';
import {AgentRepository} from '@domain/repositories/agent.repository';
import {LeaseInspection} from '@domain/entities/leaseInspection.entity';
import {LeaseInspectionRepository} from '@domain/repositories/leaseInspection.repository';
import {LeaseInspectionDto} from '@infrastructure/dtos/leaseInspection.dto';
import {LeaseInspectionDtoMapper} from '@infrastructure/mappers/leaseInspection.dto.mapper';
import {EventEmitter2} from "@nestjs/event-emitter";
import {LeaseInspectionCreatedEvent} from "@domain/events/LeaseInspectionCreated.event";
import {Lease} from "@domain/entities/lease.entity";
import {LeaseInspectionStep} from "@domain/entities/leaseInspectionStep.entity";
import {LeaseInspectionStepRepository} from "@domain/repositories/leaseInspectionStep.repository";
import {ElementType} from "@domain/entities/enum/element.enum.entity";
import {LeaseInspectionStepService} from "@domain/services/leaseInspectionStep.service";
import {Room} from "@domain/entities/room.entity";
import {
    LeaseInspectionContextCeilingDto,
    LeaseInspectionContextDto,
    LeaseInspectionContextFurnishingDto,
    LeaseInspectionContextGroundDto,
    LeaseInspectionContextRoomDto,
    LeaseInspectionContextStairDto,
    LeaseInspectionContextWallDto
} from "@infrastructure/dtos/leaseInspectionContextDto";
import {RoomDtoMapper} from "@infrastructure/mappers/room.dto.mapper";
import {RoomRepository} from "@domain/repositories/room.repository";
import {SignatureRepository} from '@domain/repositories/signature.repository';
import {SignatureWithFileDto} from '@/infrastructure/dtos/signatureWithFile.dto';
import {SignatureService} from "@domain/services/signature.service";

@Injectable()
export class LeaseInspectionService {
    constructor(
        private readonly leaseRepository: LeaseRepository,
        private readonly agentRepository: AgentRepository,
        private readonly signatureRepository: SignatureRepository,
        private readonly signatureService: SignatureService,
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

        const event = new LeaseInspectionCreatedEvent(leaseInspectionCreated, lease.getEstate());
        this.eventEmitter.emit(LeaseInspectionCreatedEvent.eventName, event);

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
        const agentSignature = leaseInspection.agentSignature ? await this.signatureService.get(leaseInspection.agentSignature.id, leaseInspection.id, SignatureService.AGENT_KEY) : undefined;
        const tenantSignature = leaseInspection.tenantSignature ? await this.signatureService.get(leaseInspection.tenantSignature.id, leaseInspection.id, SignatureService.TENANT_KEY) : undefined;
        return LeaseInspectionDtoMapper.fromModel(leaseInspection, agentSignature, tenantSignature);
    }

    async update(leaseInspectionId: string, leaseInspectionDto: LeaseInspectionDto): Promise<LeaseInspectionDto> {
        leaseInspectionDto.id = leaseInspectionId;
        const agent = await this.agentRepository.findById(leaseInspectionDto.agentId);
        const lease = await this.leaseRepository.findById(leaseInspectionDto.leaseId);
        if (!lease) {
            throw new NotFoundException('lease does not exist');
        }
        const agentSignature = await this.signatureRepository.findById(leaseInspectionDto.agentSignature.id);
        const tenantSignature = await this.signatureRepository.findById(leaseInspectionDto.tenantSignature.id);

        const leaseInspection = LeaseInspectionDtoMapper.toModel(leaseInspectionDto, lease, agent, agentSignature, tenantSignature);

        const agentSignatureDto = leaseInspection.agentSignature ? await this.signatureService.get(leaseInspection.agentSignature.id, leaseInspection.id, SignatureService.AGENT_KEY) : undefined;
        const tenantSignatureDto = leaseInspection.tenantSignature ? await this.signatureService.get(leaseInspection.tenantSignature.id, leaseInspection.id, SignatureService.TENANT_KEY) : undefined;

        return LeaseInspectionDtoMapper.fromModel(await this.repository.updateElement(leaseInspection), agentSignatureDto, tenantSignatureDto);
    }

    async signByAgent(leaseInspectionId: string, signatureWithFileDto: SignatureWithFileDto): Promise<LeaseInspectionDto> {
        const leaseInspection = await this.repository.findById(leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('lease inspection does not exist');
        }
        if (leaseInspection.agentSignature) {
            throw new UnauthorizedException('lease inspection already signed by tenant')
        }
        const agentSignatureCreated = await this.signatureService.create(signatureWithFileDto, leaseInspection.id, SignatureService.AGENT_KEY);
        leaseInspection.agentSignature = agentSignatureCreated;

        const agentSignatureDto = leaseInspection.agentSignature ? await this.signatureService.get(leaseInspection.agentSignature.id, leaseInspection.id, SignatureService.AGENT_KEY) : undefined;
        const tenantSignatureDto = leaseInspection.tenantSignature ? await this.signatureService.get(leaseInspection.tenantSignature.id, leaseInspection.id, SignatureService.TENANT_KEY) : undefined;
        return LeaseInspectionDtoMapper.fromModel(await this.repository.updateElement(leaseInspection), agentSignatureDto, tenantSignatureDto);
    }

    async signByTenant(leaseInspectionId: string, signatureWithFileDto: SignatureWithFileDto): Promise<LeaseInspectionDto> {
        const leaseInspection = await this.repository.findById(leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('lease inspection does not exist');
        }
        if (leaseInspection.tenantSignature) {
            throw new UnauthorizedException('lease inspection already signed by tenant')
        }
        const tenantSignature = await this.signatureService.create(signatureWithFileDto, leaseInspection.id, SignatureService.TENANT_KEY);
        leaseInspection.tenantSignature = tenantSignature;

        const agentSignatureDto = leaseInspection.agentSignature ? await this.signatureService.get(leaseInspection.agentSignature.id, leaseInspection.id, SignatureService.AGENT_KEY) : undefined;
        const tenantSignatureDto = leaseInspection.tenantSignature ? await this.signatureService.get(leaseInspection.tenantSignature.id, leaseInspection.id, SignatureService.TENANT_KEY) : undefined;
        return LeaseInspectionDtoMapper.fromModel(await this.repository.updateElement(leaseInspection), agentSignatureDto, tenantSignatureDto);
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
        let walls = await this.getRelatedStepContext(leaseInspection, ElementType.WALL, room) as LeaseInspectionContextWallDto[];
        const ceiling = (await this.getRelatedStepContext(leaseInspection, ElementType.CEILING, room))[0] as LeaseInspectionContextCeilingDto;
        const ground = (await this.getRelatedStepContext(leaseInspection, ElementType.GROUND, room))[0] as LeaseInspectionContextGroundDto;
        const stairs = await this.getRelatedStepContext(leaseInspection, ElementType.STAIR, room) as LeaseInspectionContextStairDto[];
        const furnishing = await this.getRelatedStepContext(leaseInspection, ElementType.FURNISHING, room) as LeaseInspectionContextFurnishingDto[];

        walls = walls.sort((a, b) => a.wall.order - b.wall.order);

        const roomDto = RoomDtoMapper.fromModel(room);
        return new LeaseInspectionContextRoomDto(roomDto, walls, ceiling, ground, stairs, furnishing);
    }

    async getContext(leaseInspectionId: string) {
        const leaseInspection: LeaseInspection = await this.repository.findById(leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException('lease inspection does not exist');
        }

        const rooms = await this.roomRepository.findAllByEstate(leaseInspection.lease.getEstate().id);
        let leaseInspectionContextRooms = [];
        for (const room of rooms) {
            leaseInspectionContextRooms.push(await this.getRoomContext(leaseInspection, room));
        }

        leaseInspectionContextRooms = leaseInspectionContextRooms.sort((a, b) => a.order - b.order);

        const agentSignatureDto = leaseInspection.agentSignature ? await this.signatureService.get(leaseInspection.agentSignature.id, leaseInspection.id, SignatureService.AGENT_KEY) : undefined;
        const tenantSignatureDto = leaseInspection.tenantSignature ? await this.signatureService.get(leaseInspection.tenantSignature.id, leaseInspection.id, SignatureService.TENANT_KEY) : undefined;

        const leaseInspectionDto = LeaseInspectionDtoMapper.fromModel(leaseInspection, agentSignatureDto, tenantSignatureDto);
        return new LeaseInspectionContextDto(leaseInspectionDto, leaseInspectionContextRooms);
    }


}
