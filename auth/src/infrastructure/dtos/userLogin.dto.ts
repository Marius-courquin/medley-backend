import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}