import { Injectable } from "@nestjs/common";
import { GenericSubElement } from "@domain/entities/genericSubElement.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class GenericSubElementRepository extends Repository<GenericSubElement>{
    constructor(
        private dataSource: DataSource)
    {
        super(GenericSubElement, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<GenericSubElement | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateGenericSubElement(genericSubElement: GenericSubElement): Promise<GenericSubElement | undefined> {
        return this.save(genericSubElement);
    }
    
    async findBySubElement(subElementId: string): Promise<GenericSubElement> {
        return this.createQueryBuilder("generic_sub_element")
            .innerJoinAndSelect("generic_sub_element.subElement", "sub_element")
            .where("sub_element.id = :subElementId", { subElementId })
            .getOne();
    }

}
