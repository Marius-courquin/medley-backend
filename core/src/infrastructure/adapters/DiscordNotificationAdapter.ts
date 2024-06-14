import { Injectable } from '@nestjs/common';
import * as process from "node:process";

@Injectable()
export class DiscordNotificationAdapter {
    private webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    private isProd = process.env.ENV === 'production';

    async pushMessage(message: string, tagHere ?: boolean): Promise<void> {
        if (!this.isProd) {
            return;
        }
        try {
            const content = tagHere ? `@here ${message}` : message;
            fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: content }),
            }).then((response) => {
                if (!response.ok) {
                    console.error('Error sending message to Discord', response.statusText);
                }
            });
        } catch (error) {
            console.error('Error sending message to Discord', error);
        }
    }

    async pushEmbed(embed: any, tagHere ?: boolean): Promise<void> {
        if (!this.isProd) {
            return;
        }
        try {
            fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: tagHere ? '@here' : '',
                    embeds: [embed]
                }),
            }).then((response) => {
                if (!response.ok) {
                    console.error('Error sending message to Discord', response.statusText);
                }
            });
        } catch (error) {
            console.error('Error sending message to Discord', error);
        }
    }

    buildEventMessage(event: string, message: string): string {
        return `Event dispatched: ${event} - ${message}`;
    }

    buildEventEmbed(event: string, message: string, fields: any[]): any {
        const now = new Date();
        const time = now.toLocaleTimeString('fr-FR');
        const date = now.toLocaleDateString('fr-FR');
        return {
            title: 'New event triggered',
            color: 3447003,
            fields: [
                { name: 'Event', value: event, inline: false },
                { name: 'Date', value: date, inline: true },
                { name: 'Time', value: time, inline: true },
                { name: 'Message', value: message, inline: false },
                ...fields,
            ],
        };
    }
}
