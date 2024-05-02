import { Injectable } from "@nestjs/common";
import { Room } from "@domain/entities/room.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RoomRepository extends Repository<Room>{
    constructor(private dataSource: DataSource) {
        super(Room, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Room> {
        return this.findOne({
          where: { id },
          relations: ['estate'],
        });
      }

    async findByEstate(estateId: string): Promise<Room[]> {
        return this.createQueryBuilder("room")
            .leftJoinAndSelect("room.estate", "estate")
            .where("estate.id = :estateId", { estateId })
            .getMany();
    }

    async updateElement(room: Room): Promise<Room | undefined> {
        return this.save(room);
    }
}