import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsOptional, IsString, IsUUID} from "class-validator";

export class SignatureWithLinkDto{
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        required: false,
        type: 'string',
        description: 'The id of the signature',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsDateString()
    @ApiProperty({
        required: true,
        type: 'date',
        description: 'The date of the signature',
        example: new Date(),
    })
    signedOn: Date;

    @IsString({ message: 'picture must be a string' })
    @ApiProperty({
        required: true,
        type: 'string',
        description: 'The picture of the signature',
        example: 'https://medley-minio.m-w-s.fr/pictures/estate/123e4567-e89b-12d3-a456-426614174000',
    })
    picture: string;

    constructor(
        signedOn: Date,
        picture: string,
        id: string
    ){
        this.id = id;
        this.signedOn = signedOn ?? undefined;
        this.picture = picture ?? undefined;
    }
}