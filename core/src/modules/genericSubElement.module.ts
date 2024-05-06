import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GenericSubElement } from "@domain/entities/genericSubElement.entity";
import { SubElementModule } from "@modules/subElement.module"
import { GenericSubElementController } from '@infrastructure/controllers/genericSubElement.controller';
import { GenericSubElementService } from '@domain/services/genericSubElement.service';
import { GenericSubElementRepository } from '@domain/repositories/genericSubElement.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([GenericSubElement]),
        forwardRef(() => SubElementModule)
    ],
    providers: [
        GenericSubElementService,
        GenericSubElementRepository
    ],
    exports: [
        GenericSubElementService,
        GenericSubElementRepository
    ],
    controllers: [GenericSubElementController]
})
export class GenericSubElementModule {}