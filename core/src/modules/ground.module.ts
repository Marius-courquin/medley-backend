import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElementModule } from "@modules/element.module"
import { GroundController } from '@infrastructure/controllers/ground.controller';
import { GroundService } from '@domain/services/ground.service';
import { GroundRepository } from '@domain/repositories/ground.repository';
import { Ground } from '@domain/entities/ground.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ground]),
        ElementModule
    ],
    providers: [
        GroundService,
        GroundRepository
    ],
    exports: [
        GroundService
    ],
    controllers: [GroundController]
})
export class GroundModule {}