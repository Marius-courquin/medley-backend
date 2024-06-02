import { Signature } from "@/domain/entities/signature.entity";
import { SignatureRepository } from "@/domain/repositories/signature.repository";
import { SignatureService } from "@/domain/services/signature.service";
import { LeaseController } from "@/infrastructure/controllers/lease.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([Signature]),
    ],
    providers: [
        SignatureService,
    ],
    exports: [
        SignatureRepository
    ],
    controllers: [LeaseController]
})
export class SignatureModule {}
