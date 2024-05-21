import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { LeaseInspectionSubStepState } from '@domain/entities/enum/leaseInspectionSubStep.enum.entity';
import { LeaseInspectionStep } from '@domain/entities/leaseInspectionStep.entity';
import { SubElement } from "@domain/entities/subElement.entity";

@Entity("lease_inspection_sub_step")
export class LeaseInspectionSubStep {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, type: 'enum', enum : LeaseInspectionSubStepState})
    @IsEnum(LeaseInspectionSubStepState, { message: 'state must be a valid type' })
    state: LeaseInspectionSubStepState;

    @Column({nullable: false, name : "rating"})
    @IsNumber({}, { message: 'rating must be a valid number' })
    rating: number;

    @Column({nullable: false, name : "description"})
    @IsString({ message: 'description must be a valid string' })
    description: string;

    @ManyToOne(() => LeaseInspectionStep, leaseInspectionStep => leaseInspectionStep.id, {nullable: true, eager: true})
    @IsOptional()
    leaseInspectionStep?: LeaseInspectionStep;

    @ManyToOne(() => SubElement, subElement => subElement.id, {nullable: true, eager: true})
    @IsOptional()
    subElement?: SubElement;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor (state: LeaseInspectionSubStepState, rating: number, description: string, leaseInspectionStep: LeaseInspectionStep, subElement: SubElement, id?: string) {
        this.id = id ?? undefined;
        this.state = state;
        this.rating = rating;
        this.description = description;
        this.leaseInspectionStep = leaseInspectionStep ?? undefined;
        this.subElement = subElement ?? undefined;
    }

}