import { Injectable } from "@nestjs/common";
import { WallSocket } from "@domain/entities/wallSocket.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class WallSocketRepository extends Repository<WallSocket>{
    constructor(
        private dataSource: DataSource)
    {
        super(WallSocket, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<WallSocket | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateWallSocket(wallSocket: WallSocket): Promise<WallSocket | undefined> {
        return this.save(wallSocket);
    }
    
    async findBySubElement(subElementId: string): Promise<WallSocket> {
        return this.createQueryBuilder("wall_socket")
            .innerJoinAndSelect("wall_socket.sub_element", "sub_element")
            .where("sub_element.id = :subElementId", { subElementId })
            .getOne();
    }

}
