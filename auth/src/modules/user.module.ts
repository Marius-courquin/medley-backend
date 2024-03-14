import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { userProviders} from "../providers/user.providers";
import { UserService } from "../services/user.service";

@Module({
    imports: [DatabaseModule],
    providers: [
        ...userProviders,
        UserService,
    ],
    exports: [UserService],
})
export class UserModule {}
