import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FurnishingType } from "@domain/entities/enum/furnishing.enum.entity";
import { Element } from '@domain/entities/element.entity';

@Entity()
export class Furnishing {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, name : "order"})
    @IsNumber({}, { message: 'order must be a valid number' })
    order: number;

    @Column({nullable: false, type: 'enum', enum : FurnishingType})
    @IsEnum(FurnishingType, { message: 'type must be a valid type' })
    type: FurnishingType;

    @Column({nullable: false, name: "description"})
    @IsString({ message: ' must be a valid string' })
    description: string;

    @OneToOne(() => Element, element => element.id, {nullable: true, eager: true})
    @JoinColumn()
    @IsOptional()
    element?: Element;

    constructor(order: number, type: FurnishingType, description: string, element?: Element, id?: string){
        this.id = id ?? undefined;
        this.type = type;
        this.order = order;
        this.description = description;
        this.element = element ?? undefined;
    }

}