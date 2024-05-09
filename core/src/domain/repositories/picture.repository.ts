import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {Picture} from "@domain/entities/picture.entity";

@Injectable()
export class PictureRepository extends Repository<Picture> {
    constructor(
        private dataSource: DataSource
    ) {
        super(Picture, dataSource.createEntityManager())
    }

    async findById(id: string): Promise<Picture | undefined> {
        return this.findOne({where: {id: id}});
    }
}