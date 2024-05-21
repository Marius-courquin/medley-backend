import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsUUID } from 'class-validator';
import { LeaseInspectionSubStep } from '@domain/entities/leaseInspectionSubStep.entity';
import { Picture } from '@domain/entities/picture.entity';

@Entity("lease_inspection_sub_step_picture")
export class LeaseInspectionSubStepPicture {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @OneToOne(() => Picture, picture => picture.id, { onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    @IsOptional()
    picture?: Picture
    
    @ManyToOne(() => LeaseInspectionSubStep, leaseInspectionSubStep => leaseInspectionSubStep.id, { onDelete: 'CASCADE', eager: false})
    @IsOptional()
    leaseInspectionSubStep?: LeaseInspectionSubStep;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor (picture: Picture, leaseInspectionSubStep: LeaseInspectionSubStep, id?: string) {
        this.id = id ?? undefined;
        this.picture = picture;
        this.leaseInspectionSubStep = leaseInspectionSubStep;
    }

}