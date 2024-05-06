import {Injectable} from "@nestjs/common";
import {LeaseInspection} from "@domain/entities/leaseInspection.entity";
import {DataSource, Repository} from "typeorm";


@Injectable()
export class LeaseInspectionRepository extends Repository<LeaseInspection>{
    constructor(
        private dataSource: DataSource)
    {
        super(LeaseInspection, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<LeaseInspection | undefined> {
        return await this.findOne({where: {id: id}});
    }

    async updateElement(leaseInspection: LeaseInspection): Promise<LeaseInspection> {
        return this.save(leaseInspection);
    }

    async findByLease(leaseId: string): Promise<LeaseInspection[]> {
    return this.createQueryBuilder("lease_inspection")
        .leftJoinAndSelect("lease_inspection.lease", "lease")
        .where("lease.id = :leaseId", { leaseId })
        .getMany();
    }

}
