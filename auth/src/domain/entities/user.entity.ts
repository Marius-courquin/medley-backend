import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true, nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}