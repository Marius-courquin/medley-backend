import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UserLoginDto {
    @ApiProperty({
        required: true,
        type: 'string',
        example: "magni25",
        description: "The username of the user"
    })
    @IsString({ message: 'username must be a valid string' })
    username: string;
    @ApiProperty({
        required: true,
        type: 'string',
        example: "mariuslpb62",
        description: "The password of the user"
    })
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}