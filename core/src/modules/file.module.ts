import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Picture} from "@domain/entities/picture.entity";
import {FileService} from "@domain/services/file.service";
import {S3} from "aws-sdk";
import {PictureRepository} from "@domain/repositories/picture.repository";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";


@Module({
    imports: [
        TypeOrmModule.forFeature([Picture]),
        ConfigModule
    ],
    providers: [
        {
            provide: 'AWS_S3',
            useFactory: () => {
                return new S3({
                    accessKeyId: process.env.MINIO_USER,
                    secretAccessKey: process.env.MINIO_PASSWORD,
                    endpoint: process.env.MINIO_ENDPOINT,
                    s3ForcePathStyle: true,
                    signatureVersion: 'v4'
                });
            },
        },
        FileService,
        PictureRepository
    ],
    exports: [
        FileService,
        PictureRepository
    ]
})
export class FileModule {}