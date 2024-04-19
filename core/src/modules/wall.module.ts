import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wall } from "@domain/entities/wall.entity";
import { ElementModule } from "@modules/element.module"
import { WallController } from '@infrastructure/controllers/wall.controller';
import { WallService } from '@domain/services/wall.service';
import { WallRepository } from '@domain/repositories/wall.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Wall]),
        ElementModule
    ],
    providers: [
        WallService,
        WallRepository
    ],
    exports: [
        WallService
    ],
    controllers: [WallController]
})
export class WallModule {}