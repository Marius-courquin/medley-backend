import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {DiscordNotificationAdapter} from "@infrastructure/adapters/DiscordNotificationAdapter";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly notificationService: DiscordNotificationAdapter) {
    }

    private isProd: boolean = process.env.ENV === 'production';

    async catch(exception: unknown, host: ArgumentsHost) {
        if(!this.isProd) {
            throw exception;
        } else if (!(exception instanceof HttpException)) {
            console.log(exception);
        }
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const isRequestFromBot =
            exception instanceof HttpException &&
            exception.getStatus() === HttpStatus.NOT_FOUND &&
            exception.message.toLowerCase().includes('cannot');

        if (isRequestFromBot) {
            return;
        }

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? exception.message
            : 'Internal server error';

        const tagHere = status === HttpStatus.INTERNAL_SERVER_ERROR;
        const now = new Date();
        const date = now.toLocaleDateString('fr-FR');
        const time = now.toLocaleTimeString('fr-FR');

        const embed = {
            title: 'New error occurred',
            color: status === HttpStatus.INTERNAL_SERVER_ERROR ? 0xFF0000 : 0xFFFF00,
            fields: [
                { name: 'Path', value: request.url, inline: false },
                { name: 'Method', value: request.method, inline: true },
                { name: 'Status Code', value: status, inline: true },
                { name: 'Message', value: message, inline: false },
                { name: 'Date', value: date, inline: true },
                { name: 'Time', value: time, inline: true },
            ],
        };

        await this.notificationService.pushEmbed(embed, tagHere);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}
