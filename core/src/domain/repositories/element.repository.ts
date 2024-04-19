import { Injectable } from "@nestjs/common";
import { Element } from "@domain/entities/element.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class ElementRepository extends Repository<Element>{
    constructor(
        private dataSource: DataSource)
    {
        super(Element, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Element | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateElement(element: Element): Promise<Element | undefined> {
        return this.save(element);
    }
    
    async findByRoom(roomId: string): Promise<Element[]> {
        return this.createQueryBuilder("element")
            .innerJoinAndSelect("element.room", "room")
            .where("room.id = :roomId", { roomId })
            .getMany();
    }

}
