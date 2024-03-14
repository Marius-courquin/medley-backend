import {Module} from '@nestjs/common';
import {UserModule} from "./modules/user.module";
import {AuthModule} from "./modules/auth.module";
import {DatabaseModule} from "./modules/database.module";

@Module({
    imports: [AuthModule, UserModule, DatabaseModule],
})
export class AppModule {
}
