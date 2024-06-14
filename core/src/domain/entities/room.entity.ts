import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Estate } from '@domain/entities/estate.entity';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { RoomType } from '@domain/entities/enum/room.enum.entity';

@Entity()
export class Room {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, name : "order"})
    @IsNumber({}, { message: 'order must be a valid number' })
    order: number;

    @Column({nullable: false, type: 'enum', enum: RoomType})
    @IsEnum(RoomType, { message: 'type must be a valid type' })
    type: RoomType;

    @Column({nullable: false, name : "description"})
    @IsString({ message: 'description must be a valid string' })
    description: string;

    @Column({nullable: false, name: "living_space"})
    @IsNumber({}, { message: 'livingSpace must be a valid number' })
    livingSpace: number;

    @Column({nullable: false, name: "walls_count"})
    @IsNumber({}, { message: 'wallsCount must be a valid number' })
    wallsCount: number;

    @Column({nullable: false, name: "doors_count"})
    @IsNumber({}, { message: 'doorsCount must be a valid number' })
    doorsCount: number;

    @Column({nullable: false, name: "windows_count"})
    @IsNumber({}, { message: 'windowsCount must be a valid number' })
    windowsCount: number;

    @Column({nullable: false, name: "assignment"})
    @IsString({ message: 'assignment must be a valid string' })
    assignment: string;

    @ManyToOne(() => Estate, estate => estate.id, { onDelete: 'CASCADE' , eager: true})
    @IsOptional()
    estate?: Estate;

    constructor (order: number, type: RoomType, description: string, livingSpace: number, wallsCount: number, doorsCount: number, windowsCount: number, assignment: string, estate?: Estate, id?: string) {
        this.id = id ?? undefined;
        this.order = order;
        this.type = type;
        this.description = description;
        this.livingSpace = livingSpace;
        this.wallsCount = wallsCount;
        this.doorsCount = doorsCount;
        this.windowsCount = windowsCount;
        this.assignment = assignment;
        this.estate = estate ?? undefined;
    }
}