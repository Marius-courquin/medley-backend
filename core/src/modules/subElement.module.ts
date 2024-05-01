import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElementModule } from '@modules/element.module';
import { SubElementRepository } from "@domain/repositories/subElement.repository";
import { SubElementController } from '@/infrastructure/controllers/subElement.controller';
import { SubElementService } from '@domain/services/subElement.service';
import { SubElement } from '@domain/entities/subElement.entity';
import { GenericSubElementModule } from '@modules/genericSubElement.module';
import { WallSocketModule } from '@modules/wallSocket.module';
import { WindowModule } from '@modules/window.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SubElement]),
        ElementModule,
        forwardRef(() => GenericSubElementModule),
        forwardRef(() => WallSocketModule),
        forwardRef(() => WindowModule),
    ],
    providers: [
        SubElementService,
        SubElementRepository
    ],
    exports: [
        SubElementService,
        SubElementRepository
    ],
    controllers: [SubElementController]
})
export class SubElementModule {}