import { Picture } from "@/domain/entities/picture.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, IsUUID } from "class-validator";
import { HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";

export class SignatureWithFileDto{
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

    @IsDate({ message: 'signedOn must be a valid date' })
    @ApiProperty({
        required: true,
        type: 'date',
        description: 'The date of the signature',
        example: new Date(),
    })
    signedOn: Date;

    @IsFile({ message: 'picture must be a file' })
    @HasMimeType(['image/jpeg', 'image/png'], { message: 'picture must be a valid image' })
    @ApiProperty({
        required: true,
        type: 'file',
        description: 'The picture of the signature',
        example: 'monkey.png',
    })
    picture: MemoryStoredFile;

    constructor(
        id: string,
        signedOn?: Date,
        picture?: MemoryStoredFile,
    ){
        this.id = id;
        this.signedOn = signedOn ?? undefined;
        this.picture = picture ?? undefined;
    }
}