import { Injectable, NotFoundException } from "@nestjs/common";
import { Signature } from "../entities/signature.entity";
import { SignatureWithFileDto } from "@infrastructure/dtos/signatureWithFile.dto";
import { SignatureWithLinkDto } from "@/infrastructure/dtos/signatureWithLink.dto";
import { Picture } from "../entities/picture.entity";
import { FileService } from "./file.service";
import { SignatureDtoMapper } from "@/infrastructure/mappers/signature.dto.mapper";
import { SignatureRepository } from "../repositories/signature.repository";
import { LeaseInspectionService } from "./leaseInspection.service";

@Injectable()
export class SignatureService {
    constructor(
        private readonly repository: SignatureRepository,
        private readonly leaseInspectionService: LeaseInspectionService,
        private readonly fileService: FileService
    ){}


    async get(id: string): Promise<SignatureWithLinkDto> {
        const signature: Signature = await this.repository.findById(id);
        if (!signature) {
            throw new NotFoundException( 'signature does not exist'); 
        }
        return SignatureDtoMapper.fromModelWithLink(signature, signature.picture.getId());
    }

    async getByLeaseInspectionId(leaseInspectionId: string): Promise<SignatureWithLinkDto[]> {
        const leaseInspection = await this.leaseInspectionService.get(leaseInspectionId);
        if (!leaseInspection) {
            throw new NotFoundException( 'leaseInspection does not exist'); 
        }
        const signatures: Signature[] = await this.repository.findByLeaseInspection(leaseInspectionId);
        return signatures.map(signature => SignatureDtoMapper.fromModelWithLink(signature, signature.picture.getId()));
    }

}