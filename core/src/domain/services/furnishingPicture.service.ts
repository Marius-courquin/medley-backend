import { Injectable, NotFoundException } from "@nestjs/common";
import { FurnishingPicture } from "@domain/entities/furnishingPicture.entity";
import { FurnishingPictureRepository } from "@domain/repositories/furnishingPicture.repository";
import { Furnishing } from "@domain/entities/furnishing.entity";
import { FileService } from "@domain/services/file.service";
import { Picture } from "@domain/entities/picture.entity";
import { PictureDto } from "@/infrastructure/dtos/picture.dto";
import { DeleteResult } from "typeorm";

@Injectable()
export class FurnishingPictureService {
    constructor(
        private readonly furnishingPictureRepository: FurnishingPictureRepository,
        private readonly fileService: FileService,
    )
    {
    }

   async create(furnishing : Furnishing, file: any): Promise<FurnishingPicture> {
        let picture: Picture = null;

        if (file){
            picture = await this.fileService.savePictureWithKey(file, this.getPictureKey(furnishing.element.room.estate.id, furnishing.element.room.id, furnishing.id));
        }
        const furnishingPicture = new FurnishingPicture(picture, furnishing);

        return this.furnishingPictureRepository.save(furnishingPicture);
    }

    async delete(furnishingPictureId : string): Promise<DeleteResult> {
        if (!await this.furnishingPictureRepository.findById(furnishingPictureId)) {
            throw new NotFoundException('Furnishing picture does not exist');
        }
        return  await this.furnishingPictureRepository.delete(furnishingPictureId);
    }

    async getFurnishingPicturesByFurnishing(furnishingId: string): Promise<FurnishingPicture> {
        return this.furnishingPictureRepository.findByFurnishing(furnishingId);
    }

    async getPicturesUrl(furnishingId: string): Promise<PictureDto> {
        const furnishingPicture: FurnishingPicture = await this.furnishingPictureRepository.findByFurnishing(furnishingId);
        return new PictureDto(furnishingPicture.id, await this.fileService.generateSignedUrlForPictureByKey(furnishingPicture.picture, this.getPictureKey(furnishingPicture.furnishing.element.room.estate.id, furnishingPicture.furnishing.element.room.id, furnishingPicture.furnishing.id)));

    }

    private getPictureKey(estasteId: string,roomId : string, furnishingId: string): string {
        return `estates/${estasteId}/rooms/${roomId}/furnishings/${furnishingId}`;
    }
    
}