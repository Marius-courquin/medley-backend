import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { Third } from '@domain/entities/third.entity';
import {EstateRepository} from "@domain/repositories/estate.repository";
import { EstateWithFileDto } from '@infrastructure/dtos/estateWithFile.dto';
import { ThirdRepository } from '@domain/repositories/third.repository';
import { EstateDtoMapper } from '@infrastructure/mappers/estate.dto.mapper'
import { Estate } from '@domain/entities/estate.entity';
import {Picture} from "@domain/entities/picture.entity";
import {FileService} from "@domain/services/file.service";
import {EstateWithLinkDto} from "@infrastructure/dtos/estateWithLink.dto";
import {uuid} from "uuidv4";


@Injectable()
export class EstateService {
    constructor(
        private readonly repository: EstateRepository,
        private readonly thirdRepository: ThirdRepository,
        private readonly fileService: FileService
    ) {}

    async createEstate(estateDto: EstateWithFileDto): Promise<EstateWithLinkDto> {
        const third:Third = await this.thirdRepository.findById(estateDto.ownerId);
        if (!third) {
            throw new NotFoundException( 'third related to ownerId does not exist');
        }
        this.assertThirdIsOwner(third);
        estateDto.id = uuid();
        let picture: Picture = null;
        if (estateDto.picture) {
            picture = await this.fileService.savePictureWithKey(estateDto.picture, this.getPictureKey(estateDto.id));
        }
        const estate = EstateDtoMapper.toModel(estateDto, third, picture);
        return EstateDtoMapper.fromModelWithLink(await this.repository.save(estate), await this.fileService.generateSignedUrlForPictureByKey(picture, this.getPictureKey(estateDto.id)));
    }

    async getByOwner(ownerId: string): Promise<EstateWithLinkDto[]> {
        const estates : Estate[] = await this.repository.findByOwner(ownerId);
        const estateWithLinkDtos = estates.map(async estate => EstateDtoMapper.fromModelWithLink(estate, await this.fileService.generateSignedUrlForPictureByKey(estate.getPicture(), this.getPictureKey(estate.id))));
        return Promise.all(estateWithLinkDtos);
    }

    async getEstate(estateId: string): Promise<EstateWithLinkDto> {
        const estate: Estate = await this.repository.findById(estateId);
        if (!estate) {
            throw new NotFoundException( 'estate does not exist'); 
        }
        return EstateDtoMapper.fromModelWithLink(estate, await this.fileService.generateSignedUrlForPictureByKey(estate.getPicture(), this.getPictureKey(estateId)));
    }

    async updateEstate(estateId: string, estateDto: EstateWithFileDto): Promise<EstateWithLinkDto> {
        const third:Third = await this.thirdRepository.findById(estateDto.ownerId);
        if (!third) {
            throw new NotFoundException( 'third related to ownerId does not exist');
        }
        this.assertThirdIsOwner(third);
        
        estateDto.id = estateId;
        let picture: Picture = null;
        if (estateDto.picture) {
            picture = await this.fileService.savePictureWithKey(estateDto.picture, this.getPictureKey(estateDto.id));
        }
        const estate : Estate = EstateDtoMapper.toModel(estateDto, third, picture);
        return EstateDtoMapper.fromModelWithLink( await this.repository.updateElement(estate), await this.fileService.generateSignedUrlForPictureByKey(estate.getPicture(), this.getPictureKey(estateDto.id)));
    }

    async search(query: string): Promise<EstateWithLinkDto[]> {
        const estates : Estate[] = await this.repository.findByString(query);
        const estateWithLinkDtos = estates.map(async estate => EstateDtoMapper.fromModelWithLink(estate, await this.fileService.generateSignedUrlForPictureByKey(estate.getPicture(), this.getPictureKey(estate.id))));
        return Promise.all(estateWithLinkDtos);
    }

    private assertThirdIsOwner(third: Third) {
        if (!third.isOwner()) {
            throw new ForbiddenException('third is not an owner')
        }
    }

    private getPictureKey(estateId: string): string {
        return `estates/${estateId}`;
    }

}