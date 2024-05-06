import { IsBoolean, IsEnum, IsOptional, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroundType } from "@domain/entities/enum/ground.enum.entity";
import { Element } from '@domain/entities/element.entity';

@Entity()
export class Ground {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, type: 'enum', enum : GroundType})
    @IsEnum(GroundType, { message: 'type must be a valid type' })
    type: GroundType;

    @Column({nullable: false, name: "lower_access_hatch"})
    @IsBoolean({ message: 'lowerAccessHatch must be a valid boolean' })
    lowerAccessHatch: boolean;

    @OneToOne(() => Element, element => element.id, {nullable: true, eager: true})
    @JoinColumn()
    @IsOptional()
    element?: Element;

    constructor(type: GroundType, lowerAccessHatch: boolean, element?: Element, id?: string){
        this.id = id ?? undefined;
        this.type = type;
        this.lowerAccessHatch = lowerAccessHatch;
        this.element = element ?? undefined;
    }

}