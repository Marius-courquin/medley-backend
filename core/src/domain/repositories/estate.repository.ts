import {Injectable} from "@nestjs/common";
import {Estate} from "@domain/entities/estate.entity";
import {Brackets, DataSource, Repository} from "typeorm";


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

    async updateElement(estate: Estate): Promise<Estate | undefined> {
        return this.save(estate);
    }

    async findByString(query: string): Promise<Estate[]> {
        return this.createQueryBuilder("estate")
        .leftJoinAndSelect("estate.owner", "owner")
        .where(new Brackets(qb => {
            qb.where("estate.streetNumber ILIKE :query", { query: `%${query}%` })
              .orWhere("estate.streetName ILIKE :query", { query: `%${query}%` })
              .orWhere("estate.city ILIKE :query", { query: `%${query}%` })
              .orWhere("estate.description ILIKE :query", { query: `%${query}%` })
              .orWhere("CAST(estate.type AS TEXT) ILIKE :query", { query: `%${query}%` })
              .orWhere("owner.firstName ILIKE :query", { query: `%${query}%` })
              .orWhere("owner.lastName ILIKE :query", { query: `%${query}%` }) 
  
        })).getMany();
    }

}