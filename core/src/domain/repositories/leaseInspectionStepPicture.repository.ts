import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { LeaseInspectionStepPicture } from "@domain/entities/leaseInspectionStepPicture.entity";

@Injectable()
export class LeaseInspectionStepPictureRepository extends Repository<LeaseInspectionStepPicture>{
    constructor(
        private dataSource: DataSource)
    {
        super(LeaseInspectionStepPicture, dataSource.createEntityManager());
    }

    async findByLeaseInspectionStep(leaseInspectionStepId: string): Promise<LeaseInspectionStepPicture[]> {
        return this.createQueryBuilder('leaseInspectionStepPicture')
            .leftJoinAndSelect('leaseInspectionStepPicture.picture', 'picture')
            .leftJoinAndSelect('leaseInspectionStepPicture.leaseInspectionStep', 'leaseInspectionStep')
            .leftJoinAndSelect('leaseInspectionStep.leaseInspection', 'leaseInspection')
            .where('leaseInspectionStepPicture.leaseInspectionStepId = :leaseInspectionStepId', { leaseInspectionStepId })
            .getMany();
    }

    async findById(id: string): Promise<LeaseInspectionStepPicture | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateElement(leaseInspectionStepPicture: LeaseInspectionStepPicture): Promise<LeaseInspectionStepPicture | undefined> {
        return this.save(leaseInspectionStepPicture);
    }

}