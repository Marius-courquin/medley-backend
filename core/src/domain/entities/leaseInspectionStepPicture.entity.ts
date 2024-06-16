import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsUUID } from 'class-validator';
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';
import { Picture } from '@domain/entities/picture.entity';

@Entity("lease_inspection_step_picture")
export class LeaseInspectionStepPicture {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @OneToOne(() => Picture, picture => picture.id, { onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    @IsOptional()
    picture?: Picture

    @ManyToOne(() => LeaseInspectionStep, leaseInspectionStep => leaseInspectionStep.id, { onDelete: 'CASCADE', eager: false})
    @IsOptional()
    leaseInspectionStep?: LeaseInspectionStep;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor (picture: Picture, leaseInspectionStep: LeaseInspectionStep, id?: string) {
        this.id = id ?? undefined;
        this.picture = picture;
        this.leaseInspectionStep = leaseInspectionStep;
    }
}