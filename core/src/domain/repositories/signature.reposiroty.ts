import { Injectable } from "@nestjs/common";
import { Signature } from "../entities/signature.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SignatureRepository {
    constructor(
        private dataSource: DataSource)
    {
        super(Signature, dataSource.createEntityManager());
    }

    async findById(id: string): Promise<Signature | undefined> {
        return await this.findOne({where: {id: id}});
    }

    async updateElement(signature: Signature): Promise<Signature> {
        return this.save(signature);
    }

    async findByLease(leaseId: string): Promise<Signature[]> {
        return this.createQueryBuilder("signature")
            .leftJoinAndSelect("signature.lease", "lease")
            .where("lease.id = :leaseId", { leaseId })
            .getMany();
    }

}