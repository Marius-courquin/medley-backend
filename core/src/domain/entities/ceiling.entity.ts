import { IsBoolean, IsEnum, IsOptional, IsUUID } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CeilingType } from "@domain/entities/enum/ceiling.enum.entity";
import { Element } from '@domain/entities/element.entity';

@Entity()
export class Ceiling {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, type: 'enum', enum : CeilingType})
    @IsEnum(CeilingType, { message: 'type must be a valid type' })
    type: CeilingType;

    @Column({nullable: false, name: "upper_access_hatch"})
    @IsBoolean({ message: 'upperAccessHatch must be a valid boolean' })
    upperAccessHatch: boolean;

    @ManyToOne(() => Element, element => element.id, {nullable: true, eager: true})
    @IsOptional()
    element?: Element;

    constructor(type: CeilingType, upperAccessHatch: boolean, element?: Element, id?: string){
        this.id = id ?? undefined;
        this.type = type;
        this.upperAccessHatch = upperAccessHatch;
        this.element = element ?? undefined;
    }

}