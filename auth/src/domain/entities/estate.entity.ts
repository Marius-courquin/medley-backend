import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Estate {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    streetNumber: string;

    @Column({nullable: false})
    streetName: string;

    @Column({nullable: false})
    zipCode: number;

    @Column({nullable: false})
    city: string;

    @Column({nullable: false})
    floor: number;

    @Column({nullable: false})
    flatNumber: number;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    livingSpace: number;

    @Column({nullable: false})
    roomCount: number;

    @Column({nullable: false})
    type: string;

    @Column({nullable: false})
    class: string;

    @Column({nullable: false})
    heaterType: string;

    @Column({nullable: false})
    waterHeaterType: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;
}