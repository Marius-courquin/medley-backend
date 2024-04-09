import { Module } from '@nestjs/common';
import { EstateModule } from './modules/estate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdModule } from './modules/third.module';

@Module({
  imports: [
    EstateModule,
    ThirdModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'medley-core',
      password: 'medley-core',
      database: 'medley-db-core',
      entities: [
        __dirname + '/domain/entities/*.entity{.ts,.js}',
      ],
      synchronize: true
    }),
  ]
})
export class AppModule {}
