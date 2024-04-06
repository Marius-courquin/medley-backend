import { Injectable } from '@nestjs/common';
import {Third} from "../entities/third.entity";
import {ThirdRepository} from "../repositories/third.repository";


@Injectable()
export class EstateService {
    constructor(
        private readonly repository: ThirdRepository,
    ) {}

    async create(estate: Third): Promise<Third> {
        return this.repository.save(estate);
    }

    async find(id: string): Promise<Third> {
        return this.repository.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.repository.deleteById(id);
    }

    async update(id: string, estate: Third): Promise<void> {
        await this.repository.updateById(id, estate);
    }
}

