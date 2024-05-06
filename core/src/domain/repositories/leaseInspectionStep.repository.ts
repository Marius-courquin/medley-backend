import {Injectable} from "@nestjs/common";
import {LeaseInspectionStep} from "@domain/entities/leaseInspectionStep.entity";
import {DataSource, Repository} from "typeorm";


@Injectable()
export class LeaseInspectionStepRepository extends Repository<LeaseInspectionStep>{
    constructor(
        private dataSource: DataSource)
    {
        super(LeaseInspectionStep, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<LeaseInspectionStep | undefined> {
        return await this.findOne({where: {id: id}});
    }

    async updateElement(leaseInspectionStep: LeaseInspectionStep): Promise<LeaseInspectionStep> {
        return this.save(leaseInspectionStep);
    }

    async findByLeaseInspection(leaseInspectionId: string): Promise<LeaseInspectionStep[]> {
    return this.createQueryBuilder("lease_inspection_step")
        .leftJoinAndSelect("lease_inspection_step.leaseInspection", "lease_inspection")
        .where("lease_inspection.id = :leaseInspectionId", { leaseInspectionId })
        .getMany();
    }

}
