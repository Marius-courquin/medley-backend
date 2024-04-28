import { Room } from "@/domain/entities/room.entity";
import { RoomRepository } from "@/domain/repositories/room.repository";
import { RoomService } from "@/domain/services/room.service";
import { RoomController } from "@/infrastructure/controllers/room.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstateModule } from "./estate.module";
import { EstateRepository } from "@/domain/repositories/estate.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Room]),
        EstateModule
    ],
    providers: [
        RoomService,
        RoomRepository,
        EstateRepository
    ],
    exports: [
        RoomService
    ],
    controllers: [RoomController]
})
export class RoomModule {}