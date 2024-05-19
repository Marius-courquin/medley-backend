import {ApiProperty} from "@nestjs/swagger";
import {IsUUID} from "class-validator";

export class AgentDto {

    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The id of the agent',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}