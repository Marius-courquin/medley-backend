import { Injectable } from "@nestjs/common";
import { Furnishing } from "@domain/entities/furnishing.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class FurnishingRepository extends Repository<Furnishing>{
    constructor(
        private dataSource: DataSource)
    {
        super(Furnishing, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Furnishing | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateFurnishing(furnishing: Furnishing): Promise<Furnishing | undefined> {
        return this.save(furnishing);
    }

    async findByElement(elementId: string): Promise<Furnishing> {
        return this.createQueryBuilder("furnishing")
            .innerJoinAndSelect("furnishing.element", "element")
            .where("element.id = :elementId", { elementId })
            .getOne();
    }

}
