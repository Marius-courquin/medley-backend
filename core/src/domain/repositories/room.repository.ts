import { Injectable } from "@nestjs/common";
import { Room } from "../entities/room.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class RoomRepository extends Repository<Room>{
    constructor(private dataSource: DataSource) {
        super(Room, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Room | undefined> {

        return this.findOne({ where: { id: id } });
    }

    async updateElement(room: Room): Promise<Room | undefined> {
        return this.save(room);
    }
}