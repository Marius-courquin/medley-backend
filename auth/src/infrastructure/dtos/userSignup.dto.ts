import { ApiProperty } from "@nestjs/swagger";
import {IsString, Matches} from "class-validator";

export class UserSignupDto {
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
        description: "The password of the user",
        pattern: '^[a-zA-Z0-9_]{6,30}$',
    })
    @IsString({ message: 'password must be a valid string'})
    @Matches(/^[a-zA-Z0-9_]{6,30}$/, { message: 'password must contain only letters, numbers and underscores and be between 6 and 30 characters long' })
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}