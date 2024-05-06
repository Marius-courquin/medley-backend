import {Injectable} from "@nestjs/common";
import {Lease} from "@domain/entities/lease.entity";
import {DataSource, Repository} from "typeorm";


@Injectable()
export class LeaseRepository extends Repository<Lease>{
    constructor(
        private dataSource: DataSource)
    {
        super(Lease, dataSource.createEntityManager());
    }

    async getByAgent(agentId: string): Promise<Lease[]> {
    return this.createQueryBuilder("lease")
        .leftJoinAndSelect("lease.agent", "agent")
        .leftJoinAndSelect("lease.estate", "estate")
        .leftJoinAndSelect("lease.tenant", "tenant")
        .where("agent.id = :agentId", { agentId })
        .getMany();
}


    async getByTenant(tenantId: string): Promise<Lease[]> {
        return this.createQueryBuilder("lease")
                    .leftJoinAndSelect("lease.tenant", "tenant")
                    .leftJoinAndSelect("lease.agent", "agent")
                    .leftJoinAndSelect("lease.estate", "estate")
                    .where("tenant.id = :tenantId", { tenantId })
                    .getMany();
    }

    async getById(id: string): Promise<Lease | undefined> {
        return await this.findOne({where: {id: id}});
    }

    async updateLease(lease: Lease): Promise<Lease> {
        return this.save(lease);
    }

}
