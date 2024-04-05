import { ApiProperty } from "@nestjs/swagger";

export class UserSignupDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}