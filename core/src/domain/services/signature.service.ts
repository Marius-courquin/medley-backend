import { Injectable } from "@nestjs/common";
import { Signature } from "../entities/signature.entity";
import { SignatureWithFileDto } from "@/infrastructure/dtos/signatureWithFile.dto";
import { SignatureWithLinkDto } from "@/infrastructure/dtos/signatureWithLink.dto";
import { Picture } from "../entities/picture.entity";
import { FileService } from "./file.service";

@Injectable()
export class SignatureRepository {
    constructor(
        private readonly repository: SignatureRepository,
        private readonly fileService: FileService
    {}

    async create(signatureDto: SignatureWithFileDto): Promise<SignatureWithLinkDto> {
        let picture: Picture = null;
        if (estateDto.picture) {
            picture = await this.fileService.savePicture(estateDto.picture, Estate);
        }
        return SignatureDtoMapper.fromModelWithLink(await this.repository.save(estate), await this.fileService.generateSignedUrlForPicture(picture, Estate));
    }

}