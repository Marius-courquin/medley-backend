import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { Room } from '@domain/entities/room.entity';
import { ElementType } from '@domain/entities/enum/element.enum.entity';

@Entity()
export class Element {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @ManyToOne(() => Room, room => room.id, {nullable: true, eager: true})
    @IsOptional()
    room?: Room;

    @Column({nullable: false, type: 'enum', enum : ElementType})
    @IsEnum(ElementType, { message: 'type must be a valid type' })
    type: ElementType;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor(type: ElementType,id : string, room?: Room){
        this.id = id ?? undefined;
        this.type = type;
        this.room = room ?? undefined;
    }

}