import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { SubElementService } from '@domain/services/subElement.service';
import { SubElementDto } from '@/infrastructure/dtos/subElement.dto';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('Sub Element')
@Controller('sub_element')
export class SubElementController {
    constructor(
        private service: SubElementService,
    ) {}

    @ApiBody({
        type: SubElementDto,
        description: 'The sub element to create',
        required: true
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
    @ApiCreatedResponse({
        description: 'The sub element has been successfully created.',
        type: SubElementDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() subElementDto: SubElementDto) {
        return this.service.create(subElementDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the sub element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The sub element does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'sub element does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The sub element has been successfully retrieved.',
        type: SubElementDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @ApiBody({
        type: SubElementDto,
        description: 'The sub element to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the sub element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
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
    @ApiOkResponse({
        description: 'The sub element has been successfully updated.',
        type: SubElementDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateElement(@Param('id', ParseUUIDPipe) id: string, @Body() subElementDto: SubElementDto) {
        return this.service.update(id, subElementDto);
    }

    @ApiQuery({
        name: 'elementId',
        type: 'string',
        description: 'The id of the element',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The sub element does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'element does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The sub element has been successfully retrieved.',
        type: SubElementDto,
        isArray: true
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getByElement(id);
    } 

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the sub element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The related entity has been successfully retrieved.',
        schema: {
            anyOf: [
                { type: 'object', $ref: '#/components/schemas/WallSocketDto' },
                { type: 'object', $ref: '#/components/schemas/GenericSubElementDto' },
                { type: 'object', $ref: '#/components/schemas/WindowDto' }
            ],
        }
    })
    @ApiNotFoundResponse({
        description: 'The sub element does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'sub element does not exist',
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id/related")
    getRelatedEntity(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.getRelatedEntity(id);
    }

}