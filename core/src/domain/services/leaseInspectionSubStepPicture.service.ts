import { Injectable, NotFoundException } from "@nestjs/common";
import { FileService } from "@domain/services/file.service";
import { Picture } from "@domain/entities/picture.entity";
import { LeaseInspectionSubStepPicture } from "@domain/entities/leaseInspectionSubStepPicture.entity";
import { LeaseInspectionSubStepPictureRepository } from "@domain/repositories/leaseInspectionSubStepPicture.repository";
import { LeaseInspectionSubStep } from "@domain/entities/leaseInspectionSubStep.entity";
import { DeleteResult } from "typeorm";
import { PictureDto } from "@infrastructure/dtos/picture.dto";


@Injectable()
export class LeaseInspectionSubStepPictureService {
    constructor(
        private readonly repository: LeaseInspectionSubStepPictureRepository,
        private readonly fileService: FileService
    ) {}

    async create(leaseInspectionSubStep: LeaseInspectionSubStep, file: any): Promise<LeaseInspectionSubStepPicture> {
        let picture: Picture = null;
        if (file){
            picture = await this.fileService.savePicture(file, LeaseInspectionSubStepPicture);
        }
        const leaseInspectionStepPicture = new LeaseInspectionSubStepPicture(picture, leaseInspectionSubStep);
        return this.repository.save(leaseInspectionStepPicture);
    }

    async delete(leaseInspectionSubStepPictureId : string): Promise<DeleteResult> {
        if (!await this.repository.findById(leaseInspectionSubStepPictureId)) {
            throw new NotFoundException('Lease inspection sub step picture does not exist');
        }
        return await this.repository.delete(leaseInspectionSubStepPictureId);
    }

    async updateLeaseInspectionSubStepPicture(leaseInspectionSubStepPictureId: string, file: any): Promise<LeaseInspectionSubStepPicture> {
        const leaseInspectionSubStepPicture: LeaseInspectionSubStepPicture = await this.repository.findById(leaseInspectionSubStepPictureId);
        if (!leaseInspectionSubStepPicture) {
            throw new NotFoundException('Lease inspection sub step picture does not exist');
        }
        const picture: Picture = await this.fileService.savePicture(file, LeaseInspectionSubStepPicture);
        leaseInspectionSubStepPicture.picture = picture;
        return this.repository.updateElement(leaseInspectionSubStepPicture);
    }

    async getPicturesUrl(leaseInspectionSubStepId: string): Promise<PictureDto[]> {
        const leaseInspectionSubStepPictures: LeaseInspectionSubStepPicture[] = await this.repository.findByLeaseInspectionSubStep(leaseInspectionSubStepId);
        const picturesDto : PictureDto[] = [];
        for (const leaseInspectionSubStepPicture of leaseInspectionSubStepPictures) {
            picturesDto.push(
                new PictureDto(leaseInspectionSubStepPicture.id, await this.fileService.generateSignedUrlForPicture(leaseInspectionSubStepPicture.picture, LeaseInspectionSubStepPicture))
            );
        }

        return picturesDto;
    }

    async getLeaseInspectionStepPicture(leaseInspectionSubStepPictureId: string): Promise<LeaseInspectionSubStepPicture> {
        const leaseInspectionSubStepPicture: LeaseInspectionSubStepPicture = await this.repository.findById(leaseInspectionSubStepPictureId);
        if (!leaseInspectionSubStepPicture) {
            throw new NotFoundException('Lease inspection sub step picture does not exist');
        }
        return leaseInspectionSubStepPicture;
    }

    async getLeaseInspectionSubStepPicturesByLeaseInspectionStep(leaseInspectionSubStepId: string): Promise<LeaseInspectionSubStepPicture[]> {
        return this.repository.findByLeaseInspectionSubStep(leaseInspectionSubStepId);
    }
    
}

