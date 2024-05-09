import { Module } from '@nestjs/common';
import { EstateService } from "@domain/services/estate.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Estate} from "@domain/entities/estate.entity";
import {EstateRepository} from "@domain/repositories/estate.repository";
import { ThirdModule } from '@modules/third.module';
import { EstateController } from '@/infrastructure/controllers/estate.controller';
import {FileModule} from "@modules/file.module";
import {NestjsFormDataModule} from "nestjs-form-data";

@Module({
    imports: [
        TypeOrmModule.forFeature([Estate]),
        ThirdModule,
        FileModule,
        NestjsFormDataModule
    ],
    providers: [
        EstateService,
        EstateRepository
    ],
    exports: [
        EstateService,
        EstateRepository
    ],
    controllers: [EstateController]
})
export class EstateModule {}