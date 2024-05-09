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
        let picture: Picture = null;
        if (estateDto.picture) {
            picture = await this.fileService.savePicture(estateDto.picture, Estate);
        }
        const estate = EstateDtoMapper.toModel(estateDto, third, picture);
        return EstateDtoMapper.fromModelWithLink(await this.repository.save(estate), await this.fileService.generateSignedUrlForPicture(picture, Estate));
    }

    async getByOwner(ownerId: string): Promise<EstateWithLinkDto[]> {
        const estates : Estate[] = await this.repository.findByOwner(ownerId);
        const estateWithLinkDtos = estates.map(async estate => EstateDtoMapper.fromModelWithLink(estate, await this.fileService.generateSignedUrlForPicture(estate.getPicture(), Estate)));
        return Promise.all(estateWithLinkDtos);
    }

    async getEstate(estateId: string): Promise<EstateWithLinkDto> {
        const estate: Estate = await this.repository.findById(estateId);
        if (!estate) {
            throw new NotFoundException( 'estate does not exist'); 
        }
        return EstateDtoMapper.fromModelWithLink(estate, await this.fileService.generateSignedUrlForPicture(estate.getPicture(), Estate));
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
            picture = await this.fileService.savePicture(estateDto.picture, Estate);
        }
        const estate : Estate = EstateDtoMapper.toModel(estateDto, third, picture);
        return EstateDtoMapper.fromModelWithLink( await this.repository.updateElement(estate), await this.fileService.generateSignedUrlForPicture(estate.getPicture(), Estate));
    }

    async search(query: string): Promise<EstateWithLinkDto[]> {
        const estates : Estate[] = await this.repository.findByString(query);
        const estateWithLinkDtos = estates.map(async estate => EstateDtoMapper.fromModelWithLink(estate, await this.fileService.generateSignedUrlForPicture(estate.getPicture(), Estate)));
        return Promise.all(estateWithLinkDtos);
    }

    private assertThirdIsOwner(third: Third) {
        if (!third.isOwner()) {
            throw new ForbiddenException('third is not an owner')
        }
    }

}