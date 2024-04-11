import { Room } from "@/domain/entities/room.entity";
import { RoomRepository } from "@/domain/repositories/room.repository";
import { RoomService } from "@/domain/services/room.service";
import { RoomController } from "@/infrastructure/controllers/room.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstateModule } from "./estate.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Room]),
        EstateModule
    ],
    providers: [
        RoomService,
        RoomRepository
    ],
    exports: [
        RoomService
    ],
    controllers: [RoomController]
})
export class RoomModule {}