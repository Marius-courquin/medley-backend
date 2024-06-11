import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import {Picture} from "@domain/entities/picture.entity";
import {PictureRepository} from "@domain/repositories/picture.repository";
import { v4 as uuid_v4 } from "uuid";
import {MemoryStoredFile} from "nestjs-form-data";

@Injectable()
export class FileService {
    private s3: AWS.S3;
    private readonly PICTURE_BUCKET: string = "pictures";

    constructor(
        @Inject('AWS_S3') s3: AWS.S3,
        private readonly pictureRepository: PictureRepository
    ) {
        this.s3 = s3;
        this.ensureBucketExists(this.PICTURE_BUCKET).then(() => {
            console.log(`Bucket "${this.PICTURE_BUCKET}" is ready.`);
        })
    }

    async savePicture(file: MemoryStoredFile, classRef: Function): Promise<Picture> {
        const className = classRef.name.toLowerCase();
        const id = uuid_v4();
        const key = `${className}/${id}`;

        const uploadParams = {
            Bucket: this.PICTURE_BUCKET,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        await this.s3.upload(uploadParams).promise();

        return await this.pictureRepository.save(new Picture(id, Picture.getTypeFromMime(this.decodeMimeType(file))));
    }

    async generateSignedUrlForPicture(picture: Picture, classRef: Function, expires: number = 3600): Promise<string> {
        if(picture.getId()) {
            const params = {
                Bucket: this.PICTURE_BUCKET,
                Key: `${classRef.name.toLowerCase()}/${picture.getId()}`,
                Expires: expires,
            };
            return this.s3.getSignedUrlPromise('getObject', params).then((url) => {
                return url;
            }).catch((err) => {
                throw new BadRequestException(err.message);
            });
        } else {
            return undefined;
        }
    }

    async ensureBucketExists(bucketName: string): Promise<void> {
        try {
            await this.s3.headBucket({ Bucket: bucketName }).promise();
            console.log(`Bucket "${bucketName}" already exists.`);
        } catch (error) {
            if (error.statusCode === 404) {
                console.log(`Bucket "${bucketName}" does not exist. Creating now...`);
                await this.createBucket(bucketName);
            } else {
                throw new Error(`Error checking bucket: ${error.message}`);
            }
        }
    }

    private async createBucket(bucketName: string): Promise<void> {
        try {
            const result = await this.s3.createBucket({
                Bucket: bucketName
            }).promise();
            console.log(`Bucket "${bucketName}" created successfully:`, result);
        } catch (error) {
            throw new Error(`Failed to create bucket: ${error.message}`);
        }
    }

    private decodeMimeType(file: MemoryStoredFile): string {
        return file.mimetype.split('/')[1];
    }
}
