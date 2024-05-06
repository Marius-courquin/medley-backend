import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { SubElementType } from '@/domain/entities/enum/subElement.enum.entity';
import { Element } from '@domain/entities/element.entity';
@Entity("sub_element")
export class SubElement {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, name : "order"})
    @IsNumber({}, { message: 'roomCount must be a valid number' })
    order: number;

    @Column({nullable: false, type: 'enum', enum : SubElementType})
    @IsEnum(SubElementType, { message: 'type must be a valid type' })
    type: SubElementType;

    @ManyToOne(() => Element, element => element.id, {nullable: true, eager: true})
    @IsOptional()
    element?: Element;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor(type: SubElementType, order: number, element?: Element, id?: string){
        this.id = id ?? undefined;
        this.type = type;
        this.order = order;
        this.element = element ?? undefined;
    }

}