import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { LeaseInspectionStepState } from '@domain/entities/enum/leaseInspectionStep.enum.entity';
import { LeaseInspection } from '@domain/entities/leaseInspection.entity';
import { Element } from "@domain/entities/element.entity";

@Entity("lease_inspection_step")
export class LeaseInspectionStep {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, type: 'enum', enum : LeaseInspectionStepState})
    @IsEnum(LeaseInspectionStepState, { message: 'state must be a valid type' })
    state: LeaseInspectionStepState;

    @Column({nullable: false, name : "rating"})
    @IsNumber({}, { message: 'rating must be a valid number' })
    rating: number;

    @Column({nullable: false, name : "description"})
    @IsString({ message: 'description must be a valid string' })
    description: string;

    @ManyToOne(() => LeaseInspection, leaseInspection => leaseInspection.id, {nullable: true, eager: true})
    @IsOptional()
    leaseInspection?: LeaseInspection;

    @ManyToOne(() => Element, element => element.id, {nullable: true, eager: true})
    @IsOptional()
    element?: Element;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor (state: LeaseInspectionStepState, rating: number, description: string, leaseInspection: LeaseInspection, element: Element, id?: string) {
        this.id = id ?? undefined;
        this.state = state;
        this.rating = rating;
        this.description = description;
        this.leaseInspection = leaseInspection ?? undefined;
        this.element = element ?? undefined;
    }

}