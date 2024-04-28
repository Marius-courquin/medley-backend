import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { GenericSubElementType } from '@domain/entities/enum/genericSubElement.enum.entity';
import { SubElement } from '@/domain/entities/subElement.entity';
@Entity("generic_sub_element")
export class GenericSubElement {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, type: 'enum', enum : GenericSubElementType})
    @IsEnum(GenericSubElementType, { message: 'type must be a valid type' })
    type: GenericSubElementType;

    @OneToOne(() => Element, element => element.id, {nullable: true, eager: true})
    @JoinColumn()
    @IsOptional()
    subElement?: SubElement;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor(type: GenericSubElementType, subElement?: SubElement, id?: string){
        this.id = id ?? undefined;
        this.type = type;
        this.subElement = subElement ?? undefined;
    }

}