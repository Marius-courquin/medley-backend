import { Injectable } from "@nestjs/common";
import { SubElement } from "@domain/entities/subElement.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class SubElementRepository extends Repository<SubElement>{
    constructor(
        private dataSource: DataSource)
    {
        super(SubElement, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<SubElement | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateElement(element: SubElement): Promise<SubElement | undefined> {
        return this.save(element);
    }
    
    async findByElement(elementId: string): Promise<SubElement[]> {
        return this.createQueryBuilder("sub_element")
            .leftJoinAndSelect("sub_element.element", "element")
            .where("element.id = :elementId", { elementId })
            .getMany();
    }

}
