import { Injectable, NotFoundException } from '@nestjs/common';
import {Third} from "@domain/entities/third.entity";
import {ThirdRepository} from "@domain/repositories/third.repository";
import { ThirdDtoMapper } from '@/infrastructure/mappers/third.dto.mapper';
import { ThirdDto } from '@/infrastructure/dtos/third.dto';


@Injectable()
export class ThirdService {
    constructor(
        private readonly repository: ThirdRepository,
    ) {}

    async createThird(estate: ThirdDto): Promise<ThirdDto> {
        return ThirdDtoMapper.fromModel(await this.repository.save(estate));
    }

    async getThird(id: string): Promise<ThirdDto> {
        const third : Third = await this.repository.findById(id);
        if (!third) {
            throw new NotFoundException( 'third does not exist');
        }
        return ThirdDtoMapper.fromModel(third);
    }

    async updateThird(id: string, third: ThirdDto): Promise<void> {
        await this.repository.updateById(id, ThirdDtoMapper.toModel(third));
    }

}

