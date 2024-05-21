import { IsDate, IsOptional, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Picture } from "./picture.entity";

@Entity()
export class Signature {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id: string;

    @Column({nullable: false, name : "signedOn"})
    @IsDate({ message: 'signedOn must be a valid date' })
    signedOn: Date;

    @OneToOne(() => Picture, picture => picture.id, { onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    picture: Picture;

    constructor(signedOn: Date, picture: Picture, id?: string) {
        this.id = id ?? undefined;
        this.signedOn = signedOn;
        this.picture = picture;
    }
}