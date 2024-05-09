import {Column, Entity, PrimaryColumn} from "typeorm";
import {IsEnum, IsUUID} from "class-validator";
import {PictureType} from "@domain/entities/enum/picture.enum.entity";
import {SubElementType} from "@domain/entities/enum/subElement.enum.entity";

@Entity()
export class Picture {

    @PrimaryColumn()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id: string;

    @Column({nullable: false, type: 'enum', enum : PictureType})
    @IsEnum(SubElementType, { message: 'type must be a valid type' })
    type: PictureType;

    constructor(id: string, type: PictureType){
        this.id = id;
        this.type = type;
    }

    getId(): string {
        return this.id;
    }

    static getTypeFromMime(mimeType: string): PictureType {
        return PictureType[mimeType.toUpperCase() as keyof typeof PictureType];
    }
}