import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 5431,
                username: 'medley-auth',
                password: 'medley-auth',
                database: 'medley-db-auth',
                entities: [
                    __dirname + '/../entities/*.entity{.ts,.js}',
                ],
                synchronize: true
            })

            return dataSource.initialize();
        },
    },
];