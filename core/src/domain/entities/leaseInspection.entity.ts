import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { LeaseInspectionType, LeaseInspectionState } from '@domain/entities/enum/leaseInspection.enum.entity';
import { Lease } from '@domain/entities/lease.entity';
import { Agent } from '@domain/entities/agent.entity';
import { IsCustomDate } from '@shared/decorators/date.shared.decorator';

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

    @Column({nullable: false, name : "end_date", type : "date",
    transformer: {
        from: (value: string) => value,
        to: (value: Date) => new Date(value).toISOString().slice(0, 10), 
    }})
    @IsCustomDate({ message: 'endDate must be a valid date in YYYY-MM-DD format' })
    endDate: Date;

    @ManyToOne(() => Lease, lease => lease.id, {nullable: true, eager: true})
    @IsOptional()
    lease?: Lease;

    @ManyToOne(() => Agent, agent => agent.id, {nullable: true, eager: true})
    @IsOptional()
    agent?: Agent;

    @OneToOne( () => Signature, signature => signature.id, { onDelete: 'CASCADE', eager: true})
    @IsOptional()
    agentSignature: Signature;

    @OneToOne( () => Signature, signature => signature.id, { onDelete: 'CASCADE', eager: true})
    @IsOptional()
    thirdSignature: Signature;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor (
        type: LeaseInspectionType,
        state: LeaseInspectionState,
        endDate: Date, lease: Lease,
        agent: Agent,
        id?: string,
        agentSignature?: Signature,
        thirdSignature?: Signature,)
    {
        this.id = id ?? undefined;
        this.type = type;
        this.state = state;
        this.endDate = endDate;
        this.agentSignature = agentSignature;
        this.thirdSignature = thirdSignature;
        this.lease = lease ?? undefined;
        this.agent = agent ?? undefined;
    }

    close() {
        this.state = LeaseInspectionState.DONE;
    }

    isCheckIn() {
        return this.type === LeaseInspectionType.CHECK_IN;
    }

}