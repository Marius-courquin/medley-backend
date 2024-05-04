import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Wall } from "@domain/entities/wall.entity";


@Injectable()
export class WallRepository extends Repository<Wall>{
    constructor(
        private dataSource: DataSource)
    {
        super(Wall, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Wall | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateWall(wall: Wall): Promise<Wall | undefined> {
        return this.save(wall);
    }
    
    async findByElement(elementId: string): Promise<Wall> {
        return this.createQueryBuilder("wall")
            .leftJoinAndSelect("wall.element", "element")
            .where("element.id = :elementId", { elementId })
            .getOne();
    }

}
