import { Injectable } from "@nestjs/common";
import { Window } from "@domain/entities/window.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class WindowRepository extends Repository<Window>{
    constructor(
        private dataSource: DataSource)
    {
        super(Window, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Window | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateElement(window: Window): Promise<Window | undefined> {
        return this.save(window);
    }
    
    async findBySubElement(subElementId: string): Promise<Window> {
        return this.createQueryBuilder("window")
            .leftJoinAndSelect("window.subElement", "sub_element")
            .where("sub_element.id = :subElementId", { subElementId })
            .getOne();
    }

}
