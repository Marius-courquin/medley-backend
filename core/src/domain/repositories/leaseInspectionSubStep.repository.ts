import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import { LeaseInspectionSubStep } from "@domain/entities/leaseInspectionSubStep.entity";


@Injectable()
export class LeaseInspectionSubStepRepository extends Repository<LeaseInspectionSubStep>{
    constructor(
        private dataSource: DataSource)
    {
        super(LeaseInspectionSubStep, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<LeaseInspectionSubStep | undefined> {
        return await this.findOne({where: {id: id}});
    }

    async updateElement(leaseInspectionSubStep: LeaseInspectionSubStep): Promise<LeaseInspectionSubStep> {
        return this.save(leaseInspectionSubStep);
    }

    async findByLeaseInspectionStep(leaseInspectionStepId: string): Promise<LeaseInspectionSubStep[]> {
    return this.createQueryBuilder("lease_inspection_sub_step")
        .leftJoinAndSelect("lease_inspection_sub_step.leaseInspectionStep", "lease_inspection_step")
        .where("lease_inspection_step.id = :leaseInspectionStepId", { leaseInspectionStepId })
        .getMany();
    }

    async findByLeaseInspectionStepAndSubElementType(leaseInspectionStepId: string, subElementType: string): Promise<LeaseInspectionSubStep[]> {
        return this.createQueryBuilder("lease_inspection_sub_step")
            .leftJoinAndSelect("lease_inspection_sub_step.leaseInspectionStep", "lease_inspection_step")
            .leftJoinAndSelect("lease_inspection_sub_step.subElement", "lease_inspection_sub_element")
            .where("lease_inspection_step.id = :leaseInspectionStepId", { leaseInspectionStepId })
            .andWhere("lease_inspection_sub_element.subElement.type = :subElementType", { subElementType })
            .getMany();
    }

}
