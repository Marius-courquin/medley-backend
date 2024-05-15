import { Injectable, NotFoundException } from "@nestjs/common";
import { LeaseInspectionStepPictureRepository } from "@domain/repositories/leaseInspectionStepPicture.repository";
import { FileService } from "@domain/services/file.service";
import { Picture } from "@domain/entities/picture.entity";
import { LeaseInspectionStepPicture } from "@domain/entities/leaseInspectionStepPicture.entity";
import { LeaseInspectionStep } from "@domain/entities/leaseInspectionStep.entity";


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
        console.log(leaseInspectionStepPicture);
        return this.repository.save(leaseInspectionStepPicture);
    }

    async updateLeaseInspectionStepPicture(leaseInspectionStepPictureId: string, file: any): Promise<LeaseInspectionStepPicture> {
        const leaseInspectionStepPicture: LeaseInspectionStepPicture = await this.repository.findById(leaseInspectionStepPictureId);
        if (!leaseInspectionStepPicture) {
            throw new NotFoundException('Lease inspection step picture does not exist');
        }
        const picture: Picture = await this.fileService.savePicture(file, LeaseInspectionStepPicture);
        leaseInspectionStepPicture.picture = picture;
        return this.repository.updateElement(leaseInspectionStepPicture);
    }

    async getPicturesUrl(leaseInspectionStepPictureId: string): Promise<string[]> {
        const leaseInspectionStepPictures: LeaseInspectionStepPicture[] = await this.repository.findByLeaseInspectionStep(leaseInspectionStepPictureId);
        if (leaseInspectionStepPictures.length === 0) {
            throw new NotFoundException('Lease inspection step picture does not exist');
        }
        console.log(leaseInspectionStepPictures);
        const picturesUrls = [];
        leaseInspectionStepPictures.forEach(leaseInspectionStepPicture => {
            picturesUrls.push(this.fileService.generateSignedUrlForPicture(leaseInspectionStepPicture.picture, LeaseInspectionStepPicture));
        });

        return picturesUrls;
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

