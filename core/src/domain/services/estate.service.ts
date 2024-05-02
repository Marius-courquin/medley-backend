import { Injectable, NotFoundException } from '@nestjs/common';
import { Third } from '@domain/entities/third.entity';
import {EstateRepository} from "@domain/repositories/estate.repository";
import { EstateDto } from '@infrastructure/dtos/estate.dto';
import { ThirdRepository } from '@domain/repositories/third.repository';
import { EstateDtoMapper } from '@infrastructure/mappers/estate.dto.mapper'
import { Estate } from '@domain/entities/estate.entity';


@Injectable()
export class EstateService {
    constructor(
        private readonly repository: EstateRepository,
        private readonly thirdRepository: ThirdRepository
    ) {}

    async createEstate(estateDto: EstateDto): Promise<EstateDto> {
        const third:Third = await this.thirdRepository.findById(estateDto.ownerId);
        if (!third) {
            throw new NotFoundException( 'third does not exist');
        }

        const estate = EstateDtoMapper.toModel(estateDto, third);
        return EstateDtoMapper.fromModel(await this.repository.save(estate));

    }

    async findByOwner(ownerId: string): Promise<EstateDto[]> {
        const estates : Estate[] = await this.repository.findByOwner(ownerId);
        if (estates.length === 0) {
            throw new NotFoundException( 'no estates found for this owner');
        }
        return estates.map(estate => EstateDtoMapper.fromModel(estate));
    }

    async getEstate(estateId: string): Promise<EstateDto> {
        const estate: Estate = await this.repository.findById(estateId);
        if (!estate) {
            throw new NotFoundException( 'estate does not exist'); 
        }
        return EstateDtoMapper.fromModel( estate);

    }

    async updateEstate(estateId: string, estateDto: EstateDto): Promise<EstateDto> {
        const third:Third = await this.thirdRepository.findById(estateDto.ownerId);
        if (!third) {
            throw new NotFoundException( 'third does not exist');
        }
        
        estateDto.id = estateId;
        const estate : Estate = EstateDtoMapper.toModel(estateDto, third);
        return EstateDtoMapper.fromModel( await this.repository.updateElement(estate));
    }

    async searchEstate(query: string): Promise<EstateDto[]> {
        const estates : Estate[] = await this.repository.findByString(query);
        if (estates.length === 0) {
            throw new NotFoundException( 'no estates found for this query');
        }
        return estates.map(estate => EstateDtoMapper.fromModel(estate));
    }

}