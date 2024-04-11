import { Injectable } from "@nestjs/common";
import {Third} from "../entities/third.entity";
import {DataSource, Repository} from "typeorm";


@Injectable()
export class ThirdRepository extends Repository<Third>{
    constructor(
        private dataSource: DataSource)
    {
        super(Third, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Third | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateById(id: string, third: Third): Promise<void> {
        await this.update({id: id}, third);
    }  


    
}
