import { Injectable } from "@nestjs/common";
import { Ground } from "@domain/entities/ground.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class GroundRepository extends Repository<Ground>{
    constructor(
        private dataSource: DataSource)
    {
        super(Ground, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Ground | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateGround(ground: Ground): Promise<Ground | undefined> {
        return this.save(ground);
    }

    async findByElement(elementId: string): Promise<Ground> {
        return this.createQueryBuilder("ground")
            .leftJoinAndSelect("ground.element", "element")
            .where("element.id = :elementId", { elementId })
            .getOne();
    }

}
