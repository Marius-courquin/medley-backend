import { Injectable } from '@nestjs/common';
import { Estate} from "../entities/estate.entity";
import {EstateRepository} from "../repositories/estate.repository";


@Injectable()
export class EstateService {
    constructor(
        private readonly repository: EstateRepository,
    ) {}

    async create(estate: Estate): Promise<Estate> {
        //LA COMMENT ON FAIT GROS ??????????
        return this.repository.save(estate);
    }

    async find(ownerId: string): Promise<Estate[]> {
        return this.repository.findByOwner(ownerId);
    }

    async delete(id: string): Promise<void> {
        await this.repository.deleteById(id);
    }


}