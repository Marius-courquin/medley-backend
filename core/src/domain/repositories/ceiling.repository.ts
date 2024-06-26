import { Injectable } from "@nestjs/common";
import { Ceiling } from "@domain/entities/ceiling.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class CeilingRepository extends Repository<Ceiling>{
    constructor(
        private dataSource: DataSource)
    {
        super(Ceiling, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Ceiling | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateElement(ceiling: Ceiling): Promise<Ceiling | undefined> {
        return this.save(ceiling);
    }

    async findByElement(elementId: string): Promise<Ceiling> {
        return this.createQueryBuilder("ceiling")
            .leftJoinAndSelect("ceiling.element", "element")
            .where("element.id = :elementId", { elementId })
            .getOne();
    }

}
