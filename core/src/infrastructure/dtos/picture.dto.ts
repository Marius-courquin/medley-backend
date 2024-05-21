import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";



export class PictureDto {
    @IsOptional()
    @IsUUID(4, { message: 'id must be a valid uuid' })
    @ApiProperty({
        type: 'string',
        description: 'The id of the lease inspection step',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id?: string;

    @IsOptional()
    @ApiProperty({
        type: 'string',
        description: 'The url to the picture',
        example: 'https://medley-minio.m-w-s.fr/pictures/estate/123e4567-e89b-12d3-a456-426614174000',
    })
    url?: string;

    constructor(id?: string, url?: string) {
        this.id = id ?? undefined;
        this.url = url ?? undefined;
    }
}