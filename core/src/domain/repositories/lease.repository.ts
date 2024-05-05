import { Injectable } from "@nestjs/common";
import { Lease } from "@domain/entities/lease.entity";
import { DataSource, Repository } from "typeorm";
import { Agent } from "@domain/entities/agent.entity";
import { Third } from "@domain/entities/third.entity";

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

    async findById(id: string): Promise<Lease | undefined> {
      console.log(id);
      const result = await this.findOne({ where: { id: id } });
      console.log(result);
      return result;
    }

    async updateLease(lease: Lease): Promise<Lease> {
        return this.save(lease);
    }

    // You might also want to add methods to find leases by estate or within a certain date range, etc.
}
