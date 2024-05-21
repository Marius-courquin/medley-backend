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

    async findByLeaseInspectionSubStep(leaseInspectionSubStepId: string): Promise<LeaseInspectionSubStepPicture[]> {
        return this.createQueryBuilder('lease_inspection_sub_step_picture')
            .leftJoinAndSelect('lease_inspection_sub_step_picture.picture', 'picture')
            .where('lease_inspection_sub_step_picture.leaseInspectionSubStepId = :leaseInspectionSubStepId', { leaseInspectionSubStepId })
            .getMany();
    }

    async findById(id: string): Promise<LeaseInspectionSubStepPicture | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateElement(leaseInspectionSubStepPicture: LeaseInspectionSubStepPicture): Promise<LeaseInspectionSubStepPicture | undefined> {
        return this.save(leaseInspectionSubStepPicture);
    }

}