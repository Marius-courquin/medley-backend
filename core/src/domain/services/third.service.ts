import { Injectable } from '@nestjs/common';
import {Third} from "@domain/entities/third.entity";
import {ThirdRepository} from "@domain/repositories/third.repository";
import { ThirdDtoMapper } from '@/infrastructure/mappers/third.dto.mapper';
import { ThirdDto } from '@/infrastructure/dtos/third.dto';


@Injectable()
export class ThirdService {
    constructor(
        private readonly repository: ThirdRepository,
    ) {}

    async create(estate: ThirdDto): Promise<ThirdDto> {
        return ThirdDtoMapper.fromModel(await this.repository.save(estate));
    }

    async find(id: string): Promise<ThirdDto> {
        return ThirdDtoMapper.fromModel(await this.repository.findById(id));
    }

    async delete(id: string): Promise<void> {
        await this.repository.deleteById(id);
    }

}

