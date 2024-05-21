import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { LeaseInspectionSubStepPicture } from "@domain/entities/leaseInspectionSubStepPicture.entity";

@Injectable()
export class LeaseInspectionSubStepPictureRepository extends Repository<LeaseInspectionSubStepPicture>{
    constructor(
        private dataSource: DataSource)
    {
        super(LeaseInspectionSubStepPicture, dataSource.createEntityManager());
    }

    async findByLeaseInspectionStep(leaseInspectionSubStepPicture: string): Promise<LeaseInspectionSubStepPicture[]> {
        return this.createQueryBuilder('leaseInspectionSubStepPicture')
            .leftJoinAndSelect('leaseInspectionSubStepPicture.picture', 'picture')
            .where('leaseInspectionSubStepPicture.leaseInspectionSubStepId = :leaseInspectionSubStepPicture', { leaseInspectionSubStepPicture })
            .getMany();
    }

    async findById(id: string): Promise<LeaseInspectionSubStepPicture | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateElement(leaseInspectionSubStepPicture: LeaseInspectionSubStepPicture): Promise<LeaseInspectionSubStepPicture | undefined> {
        return this.save(leaseInspectionSubStepPicture);
    }

}