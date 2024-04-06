import {Injectable} from "@nestjs/common";
import {Estate} from "../entities/estate.entity";
import {DataSource, Repository} from "typeorm";


@Injectable()
export class EstateRepository extends Repository<Estate>{
    constructor(
        private dataSource: DataSource)
    {
        super(Estate, dataSource.createEntityManager());
    }



    async findByOwner(ownerId: string): Promise<Estate[]> {
        return this.createQueryBuilder("estate")
                    .leftJoinAndSelect("estate.owner", "owner")
                    .where("owner.id = :ownerId", { ownerId })
                    .getMany();
    }

    async findById(id: string): Promise<Estate | undefined> {
        return this.findOne({where: {id: id}});
    }

    async deleteById(id: string): Promise<void> {
        await this.delete({id: id});
    }

    async updateById(id: string, estate: Estate): Promise<void> {
        await this.update({id: id}, estate);
    }

    



}