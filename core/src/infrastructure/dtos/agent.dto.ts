import {ApiProperty} from "@nestjs/swagger";
import {IsUUID} from "class-validator";

export class AgentDto {

    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty()
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}