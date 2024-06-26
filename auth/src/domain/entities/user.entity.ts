import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true, nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    constructor( username: string, password: string, id?: string) {
        this.id = id ?? undefined;
        this.username = username;
        this.password = password;
    }

    static of(username: string, password: string): User {
        return new User(username, password);
    }

}
