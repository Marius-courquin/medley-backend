import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ThirdType } from "@domain/entities/types/third.type";
@Entity()
export class Third {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false})
    @IsEnum(ThirdType, { message: 'type must be a valid type' })
    type: string;

    @Column({nullable: false, name : "last_name"})
    @IsString({ message: 'lastName must be a valid string' })
    lastName: string;

    @Column({nullable: false, name : "first_name"})
    @IsString({ message: 'firstName must be a valid string' })
    firstName: string;

    @Column({nullable: false})
    @IsDateString()
    dob: Date;

    @Column({nullable: true})
    @IsString({ message: 'iban must be a valid string' })
    iban: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor(type: string, lastName: string, firstName: string, dob: Date, iban: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.lastName = lastName;
        this.firstName = firstName;
        this.dob = dob;
        this.iban = iban;
    }

}
