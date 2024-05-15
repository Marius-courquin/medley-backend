import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { LeaseInspectionStepPicture } from "@domain/entities/leaseInspectionStepPicture.entity";

@Injectable()
export class LeaseInspectionStepPictureRepository extends Repository<LeaseInspectionStepPicture>{
    constructor(
        private dataSource: DataSource)
    {
        super(LeaseInspectionStepPictureRepository, dataSource.createEntityManager());
    }

    async findByLeaseInspectionStep(leaseInspectionStepId: string): Promise<LeaseInspectionStepPicture[]> {
        return this.createQueryBuilder("lease_inspection_step_picture")
            .leftJoinAndSelect("lease_inspection_step_picture.leaseInspectionStep", "lease_inspection_step")
            .where("lease_inspection_step.id = :leaseInspectionStepId", { leaseInspectionStepId })
            .getMany();
    }

    async findById(id: string): Promise<LeaseInspectionStepPicture | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateElement(leaseInspectionStepPicture: LeaseInspectionStepPicture): Promise<LeaseInspectionStepPicture | undefined> {
        return this.save(leaseInspectionStepPicture);
    }

}