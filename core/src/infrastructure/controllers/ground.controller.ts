import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { GroundService } from '@domain/services/ground.service';
import { GroundDto } from '@infrastructure/dtos/ground.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiParam, ApiQuery,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('Ground')
@Controller('ground')
export class GroundController {
    constructor(
        private service: GroundService,
    ) {}

    @ApiBody({
        type: GroundDto,
        description: 'The ground to create',
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
    @ApiBadRequestResponse({
        description: 'The element is not a ground',
        schema: {
            example: {
                statusCode: 400,
                message: 'element is not a ground',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The ground has been successfully created.',
        type: GroundDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() groundDto: GroundDto) {
        return this.service.create(groundDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the ground',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The ground does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'ground does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The ground has been successfully found.',
        type: GroundDto
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @ApiBody({
        type: GroundDto,
        description: 'The ground to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the ground',
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
        description: 'The element is not a ground',
        schema: {
            example: {
                statusCode: 400,
                message: 'element is not a ground',
            },
        }
    })
    @ApiOkResponse({
        description: 'The ground has been successfully updated.',
        type: GroundDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() groundDto: GroundDto) {
        return this.service.update(id, groundDto);
    }

    @ApiQuery({
        name: 'elementId',
        type: 'string',
        description: 'The id of the element',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiNotFoundResponse({
        description: 'No ground found for this element',
        schema: {
            example: {
                statusCode: 404,
                message: 'No ground found for this element',
            },
        }
    })
    @ApiOkResponse({
        description: 'The ground has been successfully found.',
        type: GroundDto
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getGroundByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getGroundByElement(id);
    }

}