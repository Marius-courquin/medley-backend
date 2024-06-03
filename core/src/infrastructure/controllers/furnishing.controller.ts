import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { FurnishingService } from '@domain/services/furnishing.service';
import { FurnishingDto } from '@infrastructure/dtos/furnishing.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiParam, ApiQuery,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('Furnishing')
@Controller('furnishing')
export class FurnishingController {
    constructor(
        private service: FurnishingService,
    ) {}

    @ApiBody({
        type: FurnishingDto,
        description: 'The furnishing to create',
        required: true
    })
    @ApiCreatedResponse({
        description: 'The furnishing has been successfully created.',
        type: FurnishingDto,
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
    @ApiBadRequestResponse({
        description: 'The element is not a furnishing',
        schema: {
            example: {
                statusCode: 400,
                message: 'element is not a furnishing',
            },
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() furnishingDto: FurnishingDto) {
        return this.service.create(furnishingDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the furnishing',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The furnishing does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'furnishing does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The furnishing has been successfully found.',
        type: FurnishingDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @ApiBody({
        type: FurnishingDto,
        description: 'The furnishing to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the furnishing to update',
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
    @ApiBadRequestResponse({
        description: 'The element is not a furnishing',
        schema: {
            example: {
                statusCode: 400,
                message: 'element is not a furnishing',
            },
        }
    })
    @ApiOkResponse({
        description: 'The furnishing has been successfully updated.',
        type: FurnishingDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() furnishingDto: FurnishingDto) {
        return this.service.update(id, furnishingDto);
    }

    @ApiParam({
        name: 'elementId',
        type: 'string',
        description: 'The id of the element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The furnishing has been successfully found.',
        type: FurnishingDto,
    })

    @ApiQuery({
        name: 'elementId',
        type: 'string',
        description: 'The id of the element',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'No furnishing found for this element',
        schema: {
            example: {
                statusCode: 404,
                message: 'no furnishing found for this element',
            },
        }
    })
    @ApiOkResponse({
        description: 'The furnishing has been successfully found.',
        type: FurnishingDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getFurnishingByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getFurnishingByElement(id); 
    }

}