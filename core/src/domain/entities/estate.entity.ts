import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Third} from '@domain/entities/third.entity';
import {IsEnum, IsNumber, IsOptional, IsString, IsUUID} from 'class-validator';
import {ClassType, EstateType, HeaterType, WaterHeaterType} from '@domain/entities/enum/estate.enum.entity';
import {Picture} from "@domain/entities/picture.entity";

@Entity()
export class Estate {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false})
    @IsString({ message: 'name must be a valid string' })
    name: string;

    @Column({nullable: false, name : "street_number"})
    @IsString({ message: 'streetNumber must be a valid string' })
    streetNumber: string;

    @Column({nullable: false, name : "street_name"})
    @IsString({ message: 'streetName must be a valid string' })
    streetName: string;

    @Column({nullable: false, name : "zip_code"})
    @IsString({ message: 'zipCode must be a valid string' })
    zipCode: number;

    @Column({nullable: false, name : "city"})
    @IsString({ message: 'city must be a valid string' })
    city: string;

    @Column({nullable: false, name : "floor"})
    @IsNumber({}, { message: 'floor must be a valid number' })
    floor: number;

    @Column({nullable: false, name : "flat_number"})
    @IsNumber({}, { message: 'flatNumber must be a valid number' })
    flatNumber: number;

    @Column({nullable: false, name : "description"})
    @IsString({ message: 'description must be a valid string' })
    description: string;

    @Column({nullable: false, name : "living_space"})
    @IsNumber({}, { message: 'livingSpace must be a valid number' })
    livingSpace: number;

    @Column({nullable: false, name : "room_count"})
    @IsNumber({}, { message: 'roomCount must be a valid number' })
    roomCount: number;

    @Column({nullable: false, type: 'enum', enum: EstateType})
    @IsEnum(EstateType, { message: 'type must be a valid type' })
    type: EstateType;

    @Column({nullable: false, type: 'enum', enum : ClassType})
    @IsEnum(ClassType, { message: 'class must be a valid string' })
    class: ClassType;

    @Column({nullable: false, type: 'enum', enum : HeaterType, name : "heater_type"})
    @IsEnum(HeaterType, { message: 'heaterType must be a valid string' })
    heaterType: HeaterType;

    @Column({nullable: false, type: 'enum', enum : WaterHeaterType, name : "water_heater_type"})
    @IsEnum(WaterHeaterType, { message: 'waterHeaterType must be a valid string' })
    waterHeaterType: WaterHeaterType;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    @ManyToOne(() => Third, third => third.id, {nullable: true, eager: true})
    @IsOptional()
    owner?: Third;

    @OneToOne(() => Picture, picture => picture.id, { onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    @IsOptional()
    picture: Picture;

    constructor( name: string, streetNumber: string, streetName: string, zipCode: number, city: string, floor: number, flatNumber: number, description: string, livingSpace: number, roomCount: number, type: EstateType, classType: ClassType, heaterType: HeaterType, waterHeaterType: WaterHeaterType, owner?: Third, id?: string, picture?: Picture) {
        this.id = id ?? undefined;
        this.name = name;
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
        this.owner = owner ?? undefined;
        this.picture = picture ?? undefined;
    }

    getPicture(): Picture {
        return this.picture;
    }

}