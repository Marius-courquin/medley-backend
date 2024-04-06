import { Entity, Column, PrimaryGeneratedColumn, IntegerType, Timestamp, OneToOne, ManyToOne, CreateDateColumn } from 'typeorm';
import { Third } from '@domain/entities/third.entity';

@Entity()
export class Estate {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false, name : "street_number"})
    streetNumber: string;

    @Column({nullable: false, name : "street_name"})
    streetName: string;

    @Column({nullable: false, name : "zip_code"})
    zipCode: number;

    @Column({nullable: false, name : "city"})
    city: string;

    @Column({nullable: false, name : "floor"})
    floor: number;

    @Column({nullable: false, name : "flat_number"})
    flatNumber: number;

    @Column({nullable: false, name : "description"})
    description: string;

    @Column({nullable: false, name : "living_space"})
    livingSpace: number;

    @Column({nullable: false, name : "room_count"})
    roomCount: number;

    @Column({nullable: false, name : "type"})
    type: string;

    @Column({nullable: false, name : "class"})
    class: string;

    @Column({nullable: false, name : "heater_type"})
    heaterType: string;

    @Column({nullable: false, name : "water_heater_type"})
    waterHeaterType: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    @ManyToOne(() => Third, third => third.id, {nullable: true})
    owner?: Third;

    constructor( streetNumber: string, streetName: string, zipCode: number, city: string, floor: number, flatNumber: number, description: string, livingSpace: number, roomCount: number, type: string, classType: string, heaterType: string, waterHeaterType: string, createdAt: Date, owner?: Third, id?: string) {
        this.id = id ?? undefined;
        this.streetNumber = streetNumber;
        this.streetName = streetName;
        this.zipCode = zipCode;
        this.city = city;
        this.floor = floor;
        this.flatNumber = flatNumber;
        this.description = description;
        this.livingSpace = livingSpace;
        this.roomCount = roomCount;
        this.type = type;
        this.class = classType;
        this.heaterType = heaterType;
        this.waterHeaterType = waterHeaterType;
        this.createdAt = createdAt;
        this.owner = owner ?? undefined;
    }
}