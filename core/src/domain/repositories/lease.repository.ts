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

    async findByAgent(agentId: string): Promise<Lease[]> {
    return this.createQueryBuilder("lease")
        .leftJoinAndSelect("lease.agent", "agent")
        .leftJoinAndSelect("lease.estate", "estate")
        .leftJoinAndSelect("lease.tenant", "tenant")
        .where("agent.id = :agentId", { agentId })
        .getMany();
}


    async findByTenant(tenantId: string): Promise<Lease[]> {
        return this.createQueryBuilder("lease")
            .leftJoinAndSelect("lease.tenant", "tenant")
            .leftJoinAndSelect("lease.agent", "agent")
            .leftJoinAndSelect("lease.estate", "estate")
            .where("tenant.id = :tenantId", { tenantId })
            .getMany();
    }

    async findByEstate(estateId: string): Promise<Lease> {
        const today = new Date().toISOString().split('T')[0];

        return this.createQueryBuilder("lease")
            .leftJoinAndSelect("lease.tenant", "tenant")
            .leftJoinAndSelect("lease.agent", "agent")
            .leftJoinAndSelect("lease.estate", "estate")
            .where("estate.id = :estateId", { estateId })
            .andWhere("lease.start_date <= :today AND lease.end_date >= :today", { today })
            .getOne();
    }

    async findById(id: string): Promise<Lease | undefined> {
        return await this.findOne({where: {id: id}});
    }

    async updateElement(lease: Lease): Promise<Lease> {
        return this.save(lease);
    }

}
