import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Window } from "@domain/entities/window.entity";
import { SubElementModule } from "@modules/subElement.module"
import { WindowController } from '@infrastructure/controllers/window.controller';
import { WindowService } from '@domain/services/window.service';
import { WindowRepository } from '@domain/repositories/window.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Window]),
        forwardRef(() => SubElementModule)
    ],
    providers: [
        WindowService,
        WindowRepository
    ],
    exports: [
        WindowService,
        WindowRepository
    ],
    controllers: [WindowController]
})
export class WindowModule {}