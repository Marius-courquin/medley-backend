import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Third } from '@domain/entities/third.entity';
import { Estate } from '@domain/entities/estate.entity';
import { IsNumber, IsOptional, IsUUID, IsDate } from 'class-validator';
import {Agent} from "@domain/entities/agent.entity";
import { IsCustomDate } from '@shared/decorators/date.shared.decorator';

@Entity()
export class Lease {

    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, name : "key_count"})
    @IsNumber({}, { message: 'keyCount must be a valid number' })
    keyCount: number;

    @Column({nullable: false, name : "start_date", type : "date",
    transformer: {
        from: (value: string) => value,
        to: (value: Date) => new Date(value).toISOString().slice(0, 10), 
    }})
    @IsCustomDate({ message: 'dob must be a valid date in YYYY-MM-DD format' })
    startDate: Date;

    @Column({nullable: false, name : "end_date", type : "date",
    transformer: {
        from: (value: string) => value,
        to: (value: Date) => new Date(value).toISOString().slice(0, 10), 
    }})
    @IsDate({ message: 'endDate must be a valid date' })
    endDate: Date;

    @ManyToOne(() => Estate, estate => estate.id, {nullable: false, eager: true})
    estate: Estate;

    @ManyToOne(() => Agent, agent => agent.id, {nullable: false, eager: true})
    agent: Agent;

    @ManyToOne(() => Third, tenant => tenant.id, {nullable: false, eager: true})
    tenant: Third;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", name : "created_at"})
    createdAt: Date;

    constructor( keyCount: number, startDate: Date, endDate: Date, estate: Estate, agent: Agent, tenant: Third, id?: string) {
        this.id = id ?? undefined;
        this.keyCount = keyCount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.estate = estate;
        this.agent = agent;
        this.tenant = tenant;
    }

}
