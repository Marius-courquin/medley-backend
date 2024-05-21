import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ThirdType as ThirdType } from "@domain/entities/enum/third.enum.entity";
import { IsCustomDate } from "@/shared/decorators/date.shared.decorator";


@Entity()
export class Third {
    @PrimaryGeneratedColumn("uuid")
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id?: string;

    @Column({nullable: false, type: 'enum', enum: ThirdType})
    @IsEnum(ThirdType, { message: 'type must be a valid type' })
    type: ThirdType;

    @Column({nullable: false, name : "last_name"})
    @IsString({ message: 'lastName must be a valid string' })
    lastName: string;

    @Column({nullable: false, name : "first_name"})
    @IsString({ message: 'firstName must be a valid string' })
    firstName: string;

    @Column({nullable: false, type : "date",
    transformer: {
        from: (value: string) => value,
        to: (value: Date) => new Date(value).toISOString().slice(0, 10), 
    }})
    @IsCustomDate({ message: 'dob must be a valid date in YYYY-MM-DD format' })
    dob: Date;

    @Column({nullable: true})
    @IsString({ message: 'iban must be a valid string' })
    iban: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , name : "created_at"})
    createdAt: Date;

    constructor(type: ThirdType, lastName: string, firstName: string, dob: Date, iban: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.lastName = lastName;
        this.firstName = firstName;
        this.dob = dob;
        this.iban = iban;
    }

    isOwner(): boolean {
        return this.type === ThirdType.OWNER;
    }

}
