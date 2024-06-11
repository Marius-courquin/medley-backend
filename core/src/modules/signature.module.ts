import { LeaseInspection } from "@/domain/entities/leaseInspection.entity";
import { Signature } from "@/domain/entities/signature.entity";
import { SignatureRepository } from "@/domain/repositories/signature.repository";
import { SignatureService } from "@/domain/services/signature.service";
import { LeaseController } from "@/infrastructure/controllers/lease.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeaseInspectionModule } from "./leaseInspection.module";
import { LeaseInspectionController } from "@/infrastructure/controllers/leaseInspection.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Signature]),
        LeaseInspectionModule,
    ],
    providers: [
        SignatureService,
        SignatureRepository,
    ],
    exports: [
        SignatureRepository
    ]
})
export class SignatureModule {}
