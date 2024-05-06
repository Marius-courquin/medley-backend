import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Element } from "@domain/entities/element.entity";
import { ElementRepository } from "@domain/repositories/element.repository";
import { RoomModule } from '@modules/room.module';
import { ElementController } from '@/infrastructure/controllers/element.controller';
import { ElementService } from '@domain/services/element.service';
import { CeilingModule } from '@modules/ceiling.module';
import { WallModule } from '@modules/wall.module';
import { GroundModule } from '@modules/ground.module';
import { StairModule } from '@modules/stair.module';
import { FurnishingModule } from '@modules/furnishing.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Element]),
        RoomModule,
        forwardRef(() => CeilingModule),
        forwardRef(() => WallModule),
        forwardRef(() => GroundModule),
        forwardRef(() => FurnishingModule),
        forwardRef(() => StairModule),
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