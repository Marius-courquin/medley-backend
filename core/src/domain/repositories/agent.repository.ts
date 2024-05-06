import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {Agent} from "@domain/entities/agent.entity";

@Injectable()
export class AgentRepository extends Repository<Agent> {
    constructor(
        private dataSource: DataSource
    ) {
        super(Agent, dataSource.createEntityManager())
    }

    async findById(id: string): Promise<Agent | undefined> {
        return this.findOne({where: {id: id}});
    }
}