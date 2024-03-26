import {Injectable} from "@nestjs/common";
import {User} from "../entities/user.entity";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(
        private dataSource: DataSource)
    {
        super(User, dataSource.createEntityManager());
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.findOne({where: {username: username}});
    }

    async deleteByUsername(username: string): Promise<void> {
        await this.delete({username: username});
    }
}