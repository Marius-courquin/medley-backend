import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { WallSocket } from "@domain/entities/wallSocket.entity";
import { SubElementModule } from "@modules/subElement.module"
import { WallSocketController } from '@infrastructure/controllers/wallSocket.controller';
import { WallSocketService } from '@domain/services/wallSocket.service';
import { WallSocketRepository } from '@domain/repositories/wallSocket.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([WallSocket]),
        forwardRef(() => SubElementModule)
    ],
    providers: [
        WallSocketService,
        WallSocketRepository
    ],
    exports: [
        WallSocketService,
        WallSocketRepository
    ],
    controllers: [WallSocketController]
})
export class WallSocketModule {}