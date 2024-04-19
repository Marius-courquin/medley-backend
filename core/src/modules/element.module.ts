import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Element } from "@domain/entities/element.entity";
import { ElementRepository } from "@domain/repositories/element.repository";
import { RoomModule } from '@modules/room.module';
import { ElementController } from '@/infrastructure/controllers/element.controller';
import { ElementService } from '@domain/services/element.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Element]),
        RoomModule
    ],
    providers: [
        ElementService,
        ElementRepository
    ],
    exports: [
        ElementService,
        ElementRepository
    ],
    controllers: [ElementController]
})
export class ElementModule {}