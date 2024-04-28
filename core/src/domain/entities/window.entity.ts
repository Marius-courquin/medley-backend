import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { WindowOrientation } from '@domain/entities/enum/window.enum.entity';
import { SubElement } from '@/domain/entities/subElement.entity';
@Entity()
export class Window {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, type: 'enum', enum : WindowOrientation})
    @IsEnum(WindowOrientation, { message: 'orientation must be a valid type' })
    orientation: WindowOrientation;

    @OneToOne(() => Element, element => element.id, {nullable: true, eager: true})
    @JoinColumn()
    @IsOptional()
    subElement?: SubElement;

    @Column({nullable: false, name: "has_shutter"})
    @IsBoolean({ message: 'hasSchutter must be a valid boolean' })
    hasSchutter: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor(orientation: WindowOrientation,hasShutter: boolean, subElement?: SubElement, id?: string){
        this.id = id ?? undefined;
        this.orientation = orientation;
        this.hasSchutter = hasShutter;
        this.subElement = subElement ?? undefined;
    }

}