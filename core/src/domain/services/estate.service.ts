import { Injectable, NotFoundException } from '@nestjs/common';
import { Third } from '@/domain/entities/third.entity';
import {EstateRepository} from "@/domain/repositories/estate.repository";
import { EstateDto } from '@/infrastructure/dtos/estate.dto';
import { ThirdRepository } from '@/domain/repositories/third.repository';
import { EstateDtoMapper } from '@/infrastructure/mappers/estate.dto.mapper'
import { Estate } from '../entities/estate.entity';


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
        const estates : Estate[] = await this.repository.findByOwner(ownerId);;
        return estates.map(estate => EstateDtoMapper.fromModel(estate));
    }

    async getEstate(estateId: string): Promise<EstateDto> {
        const estate: Estate = await this.repository.findById(estateId);
        console.log(estate);
        return EstateDtoMapper.fromModel( await this.repository.findById(estateId));
    }

    async deleteEstate(id: string): Promise<void> {
        await this.repository.deleteById(id);
    }


}