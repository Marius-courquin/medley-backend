import {LeaseInspectionDto} from "@infrastructure/dtos/leaseInspection.dto";
import {RoomDto} from "@infrastructure/dtos/room.dto";
import {WallDto} from "@infrastructure/dtos/wall.dto";
import {CeilingDto} from "@infrastructure/dtos/ceiling.dto";
import {GroundDto} from "@infrastructure/dtos/ground.dto";
import {StairDto} from "@infrastructure/dtos/stair.dto";
import {FurnishingWithLinkDto} from "@infrastructure/dtos/furnishingWithLink.dto";
import {WindowDto} from "@infrastructure/dtos/window.dto";
import {WallSocketDto} from "@infrastructure/dtos/wallSocket.dto";
import {GenericSubElementDto} from "@infrastructure/dtos/genericSubElement.dto";
import {LeaseInspectionStepWithLinkDto} from "@infrastructure/dtos/leaseInspectionStepWithLink.dto";
import {LeaseInspectionSubStepWithLinkDto} from "@infrastructure/dtos/leaseInspectionSubStepWithLink.dto";
import {ApiProperty} from "@nestjs/swagger";
import {SignatureWithLinkDto} from "@infrastructure/dtos/signatureWithLink.dto";

export class LeaseInspectionContextWindowDto extends LeaseInspectionSubStepWithLinkDto {
    @ApiProperty({
        type: WindowDto,
        description: 'A window of the lease inspection',
        required: true,
    })
    window: WindowDto;

    constructor(leaseInspectionSubStepDto: LeaseInspectionSubStepWithLinkDto, window: WindowDto) {
        super(leaseInspectionSubStepDto.state, leaseInspectionSubStepDto.subElement, leaseInspectionSubStepDto.description, leaseInspectionSubStepDto.rating, leaseInspectionSubStepDto.leaseInspectionStepId, leaseInspectionSubStepDto.id, leaseInspectionSubStepDto.pictures);
        this.window = window;
    }
}

export class LeaseInspectionContextWallSocketDto extends LeaseInspectionSubStepWithLinkDto {
    @ApiProperty({
        type: WallSocketDto,
        description: 'A wall socket of the lease inspection',
        required: true,
    })
    wall_socket: WallSocketDto;

    constructor(leaseInspectionSubStepDto: LeaseInspectionSubStepWithLinkDto, wall_socket: WallSocketDto) {
        super(leaseInspectionSubStepDto.state, leaseInspectionSubStepDto.subElement, leaseInspectionSubStepDto.description, leaseInspectionSubStepDto.rating, leaseInspectionSubStepDto.leaseInspectionStepId, leaseInspectionSubStepDto.id, leaseInspectionSubStepDto.pictures);
        this.wall_socket = wall_socket;
    }
}

export class LeaseInspectionContextGenericDto extends LeaseInspectionSubStepWithLinkDto {
    @ApiProperty({
        type: GenericSubElementDto,
        description: 'A generic sub step of the lease inspection',
        required: true,
    })
    generic: GenericSubElementDto;

    constructor(leaseInspectionSubStepDto: LeaseInspectionSubStepWithLinkDto, generic: GenericSubElementDto) {
        super(leaseInspectionSubStepDto.state, leaseInspectionSubStepDto.subElement, leaseInspectionSubStepDto.description, leaseInspectionSubStepDto.rating, leaseInspectionSubStepDto.leaseInspectionStepId, leaseInspectionSubStepDto.id, leaseInspectionSubStepDto.pictures);
        this.generic = generic;
    }
}

export class LeaseInspectionContextWallDto extends LeaseInspectionStepWithLinkDto {
    @ApiProperty({
        type: WallDto,
        description: 'A wall step of the lease inspection',
        required: true,
    })
    wall: WallDto;

    @ApiProperty({
        type: LeaseInspectionContextWallSocketDto,
        description: 'The wall socket sub steps of the lease inspection',
        required: true,
    })
    wallSockets?: LeaseInspectionContextWallSocketDto[];

    @ApiProperty({
        type: LeaseInspectionContextWindowDto,
        description: 'The windows sub steps of the lease inspection',
        required: true,
        isArray: true,
    })
    windows?: LeaseInspectionContextWindowDto[];

    @ApiProperty({
        type: LeaseInspectionContextGenericDto,
        description: 'The generic sub steps of the lease inspection',
        required: true,
        isArray: true,
    })
    generic?: LeaseInspectionContextGenericDto[];

    constructor(leaseInspectionStepDto: LeaseInspectionStepWithLinkDto, wall: WallDto, wallSockets: LeaseInspectionContextWallSocketDto[], windows: LeaseInspectionContextWindowDto[], generic: LeaseInspectionContextGenericDto[]) {
        super(leaseInspectionStepDto.state, leaseInspectionStepDto.rating, leaseInspectionStepDto.description, leaseInspectionStepDto.element, leaseInspectionStepDto.leaseInspectionId, leaseInspectionStepDto.id, leaseInspectionStepDto.pictures);
        this.wallSockets = wallSockets;
        this.windows = windows;
        this.generic = generic;
        this.wall = wall;
    }
}

export class LeaseInspectionContextCeilingDto extends  LeaseInspectionStepWithLinkDto {
    @ApiProperty({
        type: CeilingDto,
        description: 'The ceiling of the lease inspection',
        required: true,
    })
    ceiling: CeilingDto;

    @ApiProperty({
        type: LeaseInspectionContextWallSocketDto,
        description: 'The wall socket sub steps of the lease inspection',
        required: true,
    })
    wallSockets?: LeaseInspectionContextWallSocketDto[];

    @ApiProperty({
        type: LeaseInspectionContextWindowDto,
        description: 'The windows sub steps of the lease inspection',
        required: true,
        isArray: true,
    })
    windows?: LeaseInspectionContextWindowDto[];

    @ApiProperty({
        type: CeilingDto,
        description: 'A generic sub steps of the lease inspection',
        required: true,
        isArray: true,
    })
    generics?: LeaseInspectionContextGenericDto[];

    constructor(leaseInspectionStepDto: LeaseInspectionStepWithLinkDto, ceiling: CeilingDto, wallSockets: LeaseInspectionContextWallSocketDto[], windows: LeaseInspectionContextWindowDto[], generic: LeaseInspectionContextGenericDto[]) {
        super(leaseInspectionStepDto.state, leaseInspectionStepDto.rating, leaseInspectionStepDto.description, leaseInspectionStepDto.element, leaseInspectionStepDto.leaseInspectionId, leaseInspectionStepDto.id, leaseInspectionStepDto.pictures);
        this.wallSockets = wallSockets;
        this.windows = windows;
        this.generics = generic;
        this.ceiling = ceiling;
    }
}

export class LeaseInspectionContextGroundDto extends LeaseInspectionStepWithLinkDto {
    @ApiProperty({
        type: GroundDto,
        description: 'A ground step of the lease inspection',
        required: true,
    })
    ground: GroundDto;

    constructor(leaseInspectionStepDto: LeaseInspectionStepWithLinkDto, ground: GroundDto) {
        super(leaseInspectionStepDto.state, leaseInspectionStepDto.rating, leaseInspectionStepDto.description, leaseInspectionStepDto.element, leaseInspectionStepDto.leaseInspectionId, leaseInspectionStepDto.id, leaseInspectionStepDto.pictures);
        this.ground = ground;
    }
}

export class LeaseInspectionContextStairDto extends LeaseInspectionStepWithLinkDto {
    @ApiProperty({
        type: StairDto,
        description: 'A stair step of the lease inspection',
        required: true,
    })
    stair: StairDto;

    constructor(leaseInspectionStepDto: LeaseInspectionStepWithLinkDto, stair: StairDto) {
        super(leaseInspectionStepDto.state, leaseInspectionStepDto.rating, leaseInspectionStepDto.description, leaseInspectionStepDto.element, leaseInspectionStepDto.leaseInspectionId, leaseInspectionStepDto.id, leaseInspectionStepDto.pictures);
        this.stair = stair;
    }
}

export class LeaseInspectionContextFurnishingDto extends LeaseInspectionStepWithLinkDto {
    @ApiProperty({
        type: FurnishingWithLinkDto,
        description: 'A furnishing step of the lease inspection',
        required: true,
    })
    furnishing: FurnishingWithLinkDto;

    constructor(leaseInspectionStepDto: LeaseInspectionStepWithLinkDto, furnishing: FurnishingWithLinkDto) {
        super(leaseInspectionStepDto.state, leaseInspectionStepDto.rating, leaseInspectionStepDto.description, leaseInspectionStepDto.element, leaseInspectionStepDto.leaseInspectionId, leaseInspectionStepDto.id, leaseInspectionStepDto.pictures);
        this.furnishing = furnishing;
    }
}

export class LeaseInspectionContextRoomDto extends RoomDto {
    @ApiProperty({
        type: LeaseInspectionContextWallDto,
        description: 'The walls steps of the room',
        required: true,
        isArray: true,
    })
    walls: LeaseInspectionContextWallDto[];

    @ApiProperty({
        type: LeaseInspectionContextCeilingDto,
        description: 'The ceiling step of the room',
        required: true,
    })
    ceiling: LeaseInspectionContextCeilingDto;

    @ApiProperty({
        type: LeaseInspectionContextGroundDto,
        description: 'The ground step of the room',
        required: true,
    })
    ground: LeaseInspectionContextGroundDto;

    @ApiProperty({
        type: LeaseInspectionContextStairDto,
        description: 'The stairs steps of the room',
        required: true,
        isArray: true,
    })
    stairs: LeaseInspectionContextStairDto[];

    @ApiProperty({
        type: LeaseInspectionContextFurnishingDto,
        description: 'The furnishing steps of the room',
        required: true,
        isArray: true,
    })
    furnishings: LeaseInspectionContextFurnishingDto[];

    constructor(room: RoomDto, walls: LeaseInspectionContextWallDto[], ceiling: LeaseInspectionContextCeilingDto, ground: LeaseInspectionContextGroundDto, stairs: LeaseInspectionContextStairDto[], furnishing: LeaseInspectionContextFurnishingDto[]) {
        super(room.order, room.type, room.description, room.livingSpace, room.wallsCount, room.doorsCount, room.windowsCount, room.assignment, room.estateId, room.id);
        this.walls = walls;
        this.ceiling = ceiling;
        this.ground = ground;
        this.stairs = stairs;
        this.furnishings = furnishing;
    }
}

export class LeaseInspectionContextDto extends LeaseInspectionDto {
    @ApiProperty({
        type: LeaseInspectionContextRoomDto,
        description: 'The rooms steps of the lease inspection',
        required: true,
        isArray: true,
    })
    rooms: LeaseInspectionContextRoomDto[];

    constructor(leaseInspectionDto: LeaseInspectionDto, rooms: LeaseInspectionContextRoomDto[]) {
        super(leaseInspectionDto.type, leaseInspectionDto.state, leaseInspectionDto.leaseId, leaseInspectionDto.endDate, leaseInspectionDto.agentId, leaseInspectionDto.agentSignature, leaseInspectionDto.tenantSignature, leaseInspectionDto.id);
        this.rooms = rooms;
    }
}