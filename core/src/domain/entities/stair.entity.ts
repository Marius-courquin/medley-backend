import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { StairDirection, StairType } from '@domain/entities/enum/stair.enum.entity';
import { Element } from '@domain/entities/element.entity';
@Entity()
export class Stair {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, type: 'enum', enum : StairType})
    @IsEnum(StairType, { message: 'type must be a valid type' })
    type: StairType;

    @Column({nullable: false, type: 'enum', enum : StairDirection})
    @IsEnum(StairDirection, { message: 'type must be a valid type' })
    direction: StairDirection;

    @OneToOne(() => Element, element => element.id, {nullable: true, eager: true})
    @JoinColumn()
    @IsOptional()
    element?: Element;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor(type: StairType, direction: StairDirection, element?: Element, id?: string){
        this.id = id ?? undefined;
        this.type = type;
        this.direction = direction;
        this.element = element ?? undefined;
    }

}