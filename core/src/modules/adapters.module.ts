import {Module} from '@nestjs/common';
import {DiscordNotificationAdapter} from "@infrastructure/adapters/DiscordNotificationAdapter";

@Module({
    imports: [

    ],
    providers: [
        DiscordNotificationAdapter,
    ],
    exports: [
        DiscordNotificationAdapter,
    ],
})
export class AdaptersModule {}