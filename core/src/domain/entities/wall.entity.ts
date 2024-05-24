import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { WallType } from '@domain/entities/enum/wall.enum.entity';
import { Element } from '@domain/entities/element.entity';
@Entity()
export class Wall {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, name : "order"})
    @IsNumber({}, { message: 'order must be a valid number' })
    order: number;

    @Column({nullable: false, type: 'enum', enum : WallType})
    @IsEnum(WallType, { message: 'type must be a valid type' })
    type: WallType;

    @Column({nullable: false, name : "windows_count"})
    @IsNumber({}, { message: 'windowsCount must be a valid number' })
    windowsCount: number;

    @Column({nullable: false, name : "radiators_count"})
    @IsNumber({}, { message: 'radiatorsCount must be a valid number' })
    radiatorsCount: number;

    @Column({nullable: false, name : "wall_sockets_count"})
    @IsNumber({}, { message: 'wallSocketsCount must be a valid number' })
    wallSocketsCount: number;

    @OneToOne(() => Element, element => element.id, {nullable: true, eager: true})
    @JoinColumn()
    @IsOptional()
    element?: Element;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor(type: WallType, order: number, windowsCount: number, radiatorsCount: number, wallSocketsCount: number, element?: Element, id?: string){
        this.id = id ?? undefined;
        this.type = type;
        this.order = order;
        this.windowsCount = windowsCount;
        this.radiatorsCount = radiatorsCount;
        this.wallSocketsCount = wallSocketsCount;
        this.element = element ?? undefined;
    }

}