import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ElementService } from '@domain/services/element.service';
import { ElementDto } from '@infrastructure/dtos/element.dto';
import {ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags} from "@nestjs/swagger";

@ApiTags('Element')
@Controller('element')
export class ElementController {
    constructor(
        private service: ElementService,
    ) {}

    @ApiBody({
        type: ElementDto,
        description: 'The element to create',
        required: true
    })
    @ApiCreatedResponse({
        description: 'The element has been successfully created.',
        type: ElementDto,
    })
    @ApiNotFoundResponse({
        description: 'The room related to the element does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'room does not exist',
            },
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() elementDto: ElementDto) {
        return this.service.create(elementDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The element has been successfully retrieved.',
        type: ElementDto,
    })
    @ApiNotFoundResponse({
        description: 'The element does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'element does not exist',
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @ApiBody({
        type: ElementDto,
        description: 'The element to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the element to update',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The room related to the element does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'room does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The element has been successfully updated.',
        type: ElementDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() elementDto: ElementDto) {
        return this.service.update(id, elementDto);
    }

    @ApiParam({
        name: 'roomId',
        type: 'string',
        description: 'The id of the room',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The element has been successfully retrieved.',
        type: ElementDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getElementByRoom(@Query('roomId', ParseUUIDPipe) id: string) {
        return this.service.getElementByRoom(id);
    }   

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The related entity has been successfully retrieved.',
        schema: {
            anyOf: [
                { $ref: '#/components/schemas/WallDto' },
                { $ref: '#/components/schemas/CeilingDto' },
                { $ref: '#/components/schemas/GroundDto' },
                { $ref: '#/components/schemas/StairDto' },
                { $ref: '#/components/schemas/FurnishingDto' },
            ]
        }
    })
    @ApiNotFoundResponse({
        description: 'The element does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'element does not exist',
            },
        }
    })
    @ApiNotFoundResponse({
        description: 'No related entity found for this element',
        schema: {
            example: {
                statusCode: 404,
                message: 'no related entity found for this element',
            },
        }
    })
    @ApiNotFoundResponse({
        description: 'Element type not found',
        schema: {
            example: {
                statusCode: 404,
                message: 'element type not found',
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id/related")
    getRelatedEntity(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.getRelatedEntity(id);
}

}