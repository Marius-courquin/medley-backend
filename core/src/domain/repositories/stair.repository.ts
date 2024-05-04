import { Injectable } from "@nestjs/common";
import { Stair } from "@domain/entities/stair.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class StairRepository extends Repository<Stair>{
    constructor(
        private dataSource: DataSource)
    {
        super(Stair, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Stair | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateStair(stair: Stair): Promise<Stair | undefined> {
        return this.save(stair);
    }
    
    async findByElement(elementId: string): Promise<Stair> {
        return this.createQueryBuilder("stair")
            .leftJoinAndSelect("stair.element", "element")
            .where("element.id = :elementId", { elementId })
            .getOne();
    }

}
