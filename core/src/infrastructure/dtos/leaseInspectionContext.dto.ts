import {LeaseInspectionDto} from "@infrastructure/dtos/leaseInspection.dto";
import {RoomDto} from "@infrastructure/dtos/room.dto";
import {WallDto} from "@infrastructure/dtos/wall.dto";
import {CeilingDto} from "@infrastructure/dtos/ceiling.dto";
import {GroundDto} from "@infrastructure/dtos/ground.dto";
import {StairDto} from "@infrastructure/dtos/stair.dto";
import {FurnishingDto} from "@infrastructure/dtos/furnishing.dto";
import {WindowDto} from "@infrastructure/dtos/window.dto";
import {WallSocketDto} from "@infrastructure/dtos/wallSocket.dto";
import {GenericSubElementDto} from "@infrastructure/dtos/genericSubElement.dto";
import {LeaseInspectionStepWithLinkDto} from "@infrastructure/dtos/leaseInspectionStepWithLink.dto";
import {LeaseInspectionSubStepWithLinkDto} from "@infrastructure/dtos/leaseInspectionSubStepWithLink.dto";

export class leaseInspectionContextDto extends LeaseInspectionDto {
    rooms: leaseInspectionContextRoomDto[];

    constructor(leaseInspectionDto: LeaseInspectionDto, rooms: leaseInspectionContextRoomDto[]) {
        super(leaseInspectionDto.type, leaseInspectionDto.state, leaseInspectionDto.endDate, leaseInspectionDto.leaseId, leaseInspectionDto.agentId, leaseInspectionDto.id);
        this.rooms = rooms;
    }
}

export class leaseInspectionContextRoomDto extends RoomDto {
    walls: leaseInspectionContextWallDto[];
    ceiling: leaseInspectionContextCeilingDto;
    ground: leaseInspectionContextGroundDto;
    stairs: leaseInspectionContextStairDto[];
    furnishing: leaseInspectionContextFurnishingDto[];

    constructor(room: RoomDto, walls: leaseInspectionContextWallDto[], ceiling: leaseInspectionContextCeilingDto, ground: leaseInspectionContextGroundDto, stairs: leaseInspectionContextStairDto[], furnishing: leaseInspectionContextFurnishingDto[]) {
        super(room.order, room.type, room.description, room.livingSpace, room.wallsCount, room.doorsCount, room.windowsCount, room.assignment, room.estateId, room.id);
        this.walls = walls;
        this.ceiling = ceiling;
        this.ground = ground;
        this.stairs = stairs;
        this.furnishing = furnishing;
    }
}

export class leaseInspectionContextWallDto extends LeaseInspectionStepWithLinkDto {
    wall: WallDto;
    wallSockets?: leaseInspectionContextWallSocketDto[];
    windows?: leaseInspectionContextWindowDto[];
    generic?: leaseInspectionContextGenericDto[];

    constructor(leaseInspectionStepDto: LeaseInspectionStepWithLinkDto, wall: WallDto, wallSockets: leaseInspectionContextWallSocketDto[], windows: leaseInspectionContextWindowDto[], generic: leaseInspectionContextGenericDto[]) {
        super(leaseInspectionStepDto.state, leaseInspectionStepDto.rating, leaseInspectionStepDto.description, leaseInspectionStepDto.element, leaseInspectionStepDto.leaseInspectionId, leaseInspectionStepDto.id, leaseInspectionStepDto.pictures);
        this.wallSockets = wallSockets;
        this.windows = windows;
        this.generic = generic;
        this.wall = wall;
    }
}

export class leaseInspectionContextCeilingDto extends  LeaseInspectionStepWithLinkDto {
    ceiling: CeilingDto;
    wallSockets?: leaseInspectionContextWallSocketDto[];
    windows?: leaseInspectionContextWindowDto[];
    generic?: leaseInspectionContextGenericDto[];

    constructor(leaseInspectionStepDto: LeaseInspectionStepWithLinkDto, ceiling: CeilingDto, wallSockets: leaseInspectionContextWallSocketDto[], windows: leaseInspectionContextWindowDto[], generic: leaseInspectionContextGenericDto[]) {
        super(leaseInspectionStepDto.state, leaseInspectionStepDto.rating, leaseInspectionStepDto.description, leaseInspectionStepDto.element, leaseInspectionStepDto.leaseInspectionId, leaseInspectionStepDto.id, leaseInspectionStepDto.pictures);
        this.wallSockets = wallSockets;
        this.windows = windows;
        this.generic = generic;
        this.ceiling = ceiling;
    }
}

export class leaseInspectionContextGroundDto extends LeaseInspectionStepWithLinkDto {
    ground: GroundDto;

    constructor(leaseInspectionStepDto: LeaseInspectionStepWithLinkDto, ground: GroundDto) {
        super(leaseInspectionStepDto.state, leaseInspectionStepDto.rating, leaseInspectionStepDto.description, leaseInspectionStepDto.element, leaseInspectionStepDto.leaseInspectionId, leaseInspectionStepDto.id, leaseInspectionStepDto.pictures);
        this.ground = ground;
    }
}

export class leaseInspectionContextStairDto extends LeaseInspectionStepWithLinkDto {
    stair: StairDto;

    constructor(leaseInspectionStepDto: LeaseInspectionStepWithLinkDto, stair: StairDto) {
        super(leaseInspectionStepDto.state, leaseInspectionStepDto.rating, leaseInspectionStepDto.description, leaseInspectionStepDto.element, leaseInspectionStepDto.leaseInspectionId, leaseInspectionStepDto.id, leaseInspectionStepDto.pictures);
        this.stair = stair;
    }
}

export class leaseInspectionContextFurnishingDto extends LeaseInspectionStepWithLinkDto {
    furnishing: FurnishingDto;

    constructor(leaseInspectionStepDto: LeaseInspectionStepWithLinkDto, furnishing: FurnishingDto) {
        super(leaseInspectionStepDto.state, leaseInspectionStepDto.rating, leaseInspectionStepDto.description, leaseInspectionStepDto.element, leaseInspectionStepDto.leaseInspectionId, leaseInspectionStepDto.id, leaseInspectionStepDto.pictures);
        this.furnishing = furnishing;
    }
}

export class leaseInspectionContextWindowDto extends LeaseInspectionSubStepWithLinkDto {
    window: WindowDto;

    constructor(leaseInspectionSubStepDto: LeaseInspectionSubStepWithLinkDto, window: WindowDto) {
        super(leaseInspectionSubStepDto.state, leaseInspectionSubStepDto.subElement, leaseInspectionSubStepDto.description, leaseInspectionSubStepDto.rating, leaseInspectionSubStepDto.leaseInspectionStepId, leaseInspectionSubStepDto.id, leaseInspectionSubStepDto.pictures);
        this.window = window;
    }
}

export class leaseInspectionContextWallSocketDto extends LeaseInspectionSubStepWithLinkDto {
    wall_socket: WallSocketDto;

    constructor(leaseInspectionSubStepDto: LeaseInspectionSubStepWithLinkDto, wall_socket: WallSocketDto) {
        super(leaseInspectionSubStepDto.state, leaseInspectionSubStepDto.subElement, leaseInspectionSubStepDto.description, leaseInspectionSubStepDto.rating, leaseInspectionSubStepDto.leaseInspectionStepId, leaseInspectionSubStepDto.id, leaseInspectionSubStepDto.pictures);
        this.wall_socket = wall_socket;
    }
}

export class leaseInspectionContextGenericDto extends LeaseInspectionSubStepWithLinkDto {
    generic: GenericSubElementDto;

    constructor(leaseInspectionSubStepDto: LeaseInspectionSubStepWithLinkDto, generic: GenericSubElementDto) {
        super(leaseInspectionSubStepDto.state, leaseInspectionSubStepDto.subElement, leaseInspectionSubStepDto.description, leaseInspectionSubStepDto.rating, leaseInspectionSubStepDto.leaseInspectionStepId, leaseInspectionSubStepDto.id, leaseInspectionSubStepDto.pictures);
        this.generic = generic;
    }
}