import {Entity, PrimaryColumn} from "typeorm";
import {IsUUID} from "class-validator";

@Entity()
export class Agent {

    @PrimaryColumn()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}