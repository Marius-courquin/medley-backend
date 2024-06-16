import { Injectable, NotFoundException } from "@nestjs/common";
import { LeaseInspectionStepPictureRepository } from "@domain/repositories/leaseInspectionStepPicture.repository";
import { FileService } from "@domain/services/file.service";
import { Picture } from "@domain/entities/picture.entity";
import { LeaseInspectionStepPicture } from "@domain/entities/leaseInspectionStepPicture.entity";
import { LeaseInspectionStep } from "@domain/entities/leaseInspectionStep.entity";
import { PictureDto } from "@/infrastructure/dtos/picture.dto";
import { DeleteResult } from "typeorm";


@Injectable()
export class LeaseInspectionStepPictureService {
    constructor(
        private readonly repository: LeaseInspectionStepPictureRepository,
        private readonly fileService: FileService
    ) {}

    async create(leaseInspectionStep: LeaseInspectionStep, leaseInspectionId: string, file: any): Promise<LeaseInspectionStepPicture> {
        let picture: Picture = null;
        if (file){
            picture = await this.fileService.savePictureWithKey(file, this.getPictureKey(leaseInspectionId, leaseInspectionStep.id));
        }
        const leaseInspectionStepPicture = new LeaseInspectionStepPicture(picture, leaseInspectionStep);
        return this.repository.save(leaseInspectionStepPicture);
    }

    async delete(leaseInspectionStepPictureId : string): Promise<DeleteResult> {
        const leaseInspectionStepPicture: LeaseInspectionStepPicture = await this.repository.findById(leaseInspectionStepPictureId);
        if (!leaseInspectionStepPicture) {
            throw new NotFoundException('Lease inspection step picture does not exist');
        }
        this.fileService.deletePictureByKey(leaseInspectionStepPicture.picture, this.getPictureKey(leaseInspectionStepPicture.leaseInspectionStep.leaseInspection.id, leaseInspectionStepPicture.leaseInspectionStep.id));
        return await this.repository.delete(leaseInspectionStepPictureId);
    }
    
    async getPicturesUrl(leaseInspectionStepPictureId: string): Promise<PictureDto[]> {
        const leaseInspectionStepPictures: LeaseInspectionStepPicture[] = await this.repository.findByLeaseInspectionStep(leaseInspectionStepPictureId);
        const picturesDto : PictureDto[] = [];
        for (const leaseInspectionStepPicture of leaseInspectionStepPictures) {
            picturesDto.push(
                new PictureDto(leaseInspectionStepPicture.id, await this.fileService.generateSignedUrlForPictureByKey(leaseInspectionStepPicture.picture, this.getPictureKey(leaseInspectionStepPicture.leaseInspectionStep.leaseInspection.id, leaseInspectionStepPicture.leaseInspectionStep.id)))
            );
        }
        return picturesDto;
    }

    async getLeaseInspectionStepPicture(leaseInspectionStepPictureId: string): Promise<LeaseInspectionStepPicture> {
        const leaseInspectionStepPicture: LeaseInspectionStepPicture = await this.repository.findById(leaseInspectionStepPictureId);
        if (!leaseInspectionStepPicture) {
            throw new NotFoundException('Lease inspection step picture does not exist');
        }
        return leaseInspectionStepPicture;
    }

    async getLeaseInspectionStepPicturesByLeaseInspectionStep(leaseInspectionStepId: string): Promise<LeaseInspectionStepPicture[]> {
        return this.repository.findByLeaseInspectionStep(leaseInspectionStepId);
    }


    private getPictureKey(leaseInspectionId: string, leaseInspectionStepId: string): string {
        return `leaseInspections/${leaseInspectionId}/steps/${leaseInspectionStepId}/pictures`;
    }
    
}

