import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Third {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    type: string;

    @Column({nullable: false, name : "last_name"})
    lastName: string;

    @Column({nullable: false, name : "first_name"})
    firstName: string;

    @Column({nullable: false})
    dob: Date;

    @Column({nullable: false})
    iban: string;

    constructor(type: string, lastName: string, firstName: string, dob: Date, iban: string, id?: string) {
        this.id = id ?? undefined;
        this.type = type;
        this.lastName = lastName;
        this.firstName = firstName;
        this.dob = dob;
        this.iban = iban;
    }

}
