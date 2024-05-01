import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { WallSocketType } from '@domain/entities/enum/wallSocket.enum.entity';
import { SubElement } from '@/domain/entities/subElement.entity';
@Entity("wall_socket")
export class WallSocket {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, type: 'enum', enum : WallSocketType})
    @IsEnum(WallSocketType, { message: 'type must be a valid type' })
    type: WallSocketType;

    @OneToOne(() => SubElement, subElement => subElement.id, {nullable: true, eager: true})
    @JoinColumn()
    @IsOptional()
    subElement?: SubElement;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor(type: WallSocketType, subElement?: SubElement, id?: string){
        this.id = id ?? undefined;
        this.type = type;
        this.subElement = subElement ?? undefined;
    }

}