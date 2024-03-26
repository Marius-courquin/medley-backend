import {User} from "../../domain/entities/user.entity";
import {UserDto} from "../dtos/user.dto";
import {Mapper} from "../../base/mapper";

export class UserDtoMapper extends Mapper<User, UserDto> {
    fromModel(user: User): UserDto {
        return new UserDto(
            user.username,
            user.password
        );
    }

    toModel(param: UserDto): User {
        return new User(
            param.username,
            param.password
        );
    }
}