import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { LeaseInspectionType, LeaseInspectionState } from '@domain/entities/enum/leaseInspection.enum.entity';
import { Lease } from '@domain/entities/lease.entity';
import { Agent } from '@domain/entities/agent.entity';

@Entity("lease_inspection")
export class LeaseInspection {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, type: 'enum', enum : LeaseInspectionType})
    @IsEnum(LeaseInspectionType, { message: 'type must be a valid type' })
    type: LeaseInspectionType;

    @Column({nullable: false, type: 'enum', enum : LeaseInspectionState})
    @IsEnum(LeaseInspectionState, { message: 'state must be a valid type' })
    state: LeaseInspectionState;

    @Column({nullable: false, name : "end_date"})
    @IsDateString()
    endDate: Date;

    @ManyToOne(() => Lease, lease => lease.id, {nullable: true, eager: true})
    @IsOptional()
    lease?: Lease;

    @ManyToOne(() => Agent, agent => agent.id, {nullable: true, eager: true})
    @IsOptional()
    agent?: Agent;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor (type: LeaseInspectionType, state: LeaseInspectionState, endDate: Date, lease: Lease, agent: Agent, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.state = state;
        this.endDate = endDate;
        this.lease = lease ?? undefined;
        this.agent = agent ?? undefined;
    }

}