import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { FurnishingPicture } from "@domain/entities/furnishingPicture.entity";

@Injectable()
export class FurnishingPictureRepository extends Repository<FurnishingPicture>{
    constructor(
        private dataSource: DataSource)
    {
        super(FurnishingPicture, dataSource.createEntityManager());
    }

    async findByFurnishing(furnishingId: string): Promise<FurnishingPicture> {
        return this.createQueryBuilder('FurnishingPicture')
            .leftJoinAndSelect('FurnishingPicture.picture', 'picture')
            .leftJoinAndSelect('FurnishingPicture.furnishing', 'furnishing')
            .leftJoinAndSelect('furnishing.element', 'element')
            .leftJoinAndSelect('element.room', 'room')
            .leftJoinAndSelect('room.estate', 'estate')
            .where('FurnishingPicture.furnishingId = :furnishingId', { furnishingId })
            .getOne();
    }

    async findById(id: string): Promise<FurnishingPicture | undefined> {
        return this.findOne({where: {id: id}});
    }

    async updateElement(furnishingPicture: FurnishingPicture): Promise<FurnishingPicture | undefined> {
        return this.save(furnishingPicture);
    }

}