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

    async create(leaseInspectionStep: LeaseInspectionStep, file: any): Promise<LeaseInspectionStepPicture> {
        let picture: Picture = null;
        if (file){
            picture = await this.fileService.savePicture(file, LeaseInspectionStepPicture);
        }
        const leaseInspectionStepPicture = new LeaseInspectionStepPicture(picture, leaseInspectionStep);
        return this.repository.save(leaseInspectionStepPicture);
    }

    async delete(leaseInspectionStepPictureId : string): Promise<DeleteResult> {
        if (!await this.repository.findById(leaseInspectionStepPictureId)) {
            throw new NotFoundException('Lease inspection step picture does not exist');
        }
        return await this.repository.delete(leaseInspectionStepPictureId);
    }
    
    async getPicturesUrl(leaseInspectionStepPictureId: string): Promise<PictureDto[]> {
        const leaseInspectionStepPictures: LeaseInspectionStepPicture[] = await this.repository.findByLeaseInspectionStep(leaseInspectionStepPictureId);
        if (leaseInspectionStepPictures.length === 0) {
            throw new NotFoundException('Lease inspection step picture does not exist');
        }
        const picturesDto : PictureDto[] = [];
        for (const leaseInspectionStepPicture of leaseInspectionStepPictures) {
            picturesDto.push(
                new PictureDto(leaseInspectionStepPicture.id, await this.fileService.generateSignedUrlForPicture(leaseInspectionStepPicture.picture, LeaseInspectionStepPicture))
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

    
}

