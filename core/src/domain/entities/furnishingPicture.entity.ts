import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsUUID } from 'class-validator';
import { Furnishing } from '@domain/entities/furnishing.entity';
import { Picture } from '@domain/entities/picture.entity';

@Entity("furnishing_picture")
export class FurnishingPicture {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @OneToOne(() => Picture, picture => picture.id, { onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    @IsOptional()
    picture?: Picture
    
    @ManyToOne(() => Furnishing, Furnishing => Furnishing.id, { onDelete: 'CASCADE', eager: true})
    @IsOptional()
    furnishing?: Furnishing;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor (picture: Picture, furnishing: Furnishing, id?: string) {
        this.id = id ?? undefined;
        this.picture = picture;
        this.furnishing = furnishing;
    }
}