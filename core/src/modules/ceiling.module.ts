import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ElementModule } from "@modules/element.module"
import { CeilingController } from '@infrastructure/controllers/ceiling.controller';
import { CeilingService } from '@domain/services/ceiling.service';
import { CeilingRepository } from '@domain/repositories/ceiling.repository';
import { Ceiling } from '@domain/entities/ceiling.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ceiling]),
        forwardRef(() => ElementModule)
    ],
    providers: [
        CeilingService,
        CeilingRepository
    ],
    exports: [
        CeilingService,
        CeilingRepository
    ],
    controllers: [CeilingController]
})
export class CeilingModule {}