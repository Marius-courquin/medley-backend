import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { StairService } from '@domain/services/stair.service';
import { StairDto } from '@infrastructure/dtos/stair.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiParam, ApiQuery,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('Stair')
@Controller('stair')
export class StairController {
    constructor(
        private service: StairService,
    ) {}

    @ApiBody({
        type: StairDto,
        description: 'The stair to create',
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
        description: 'The element is not a stair',
        schema: {
            example: {
                statusCode: 400,
                message: 'element is not a stair',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The stair has been successfully created.',
        type: StairDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() stairDto: StairDto) {
        return this.service.create(stairDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the stair',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The stair does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'stair does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The stair has been successfully retrieved.',
        type: StairDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @ApiBody({
        type: StairDto,
        description: 'The stair to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the stair',
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
        description: 'The stair has been successfully updated.',
        type: StairDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() stairDto: StairDto) {
        return this.service.update(id, stairDto);
    }

    @ApiQuery({
        name: 'elementId',
        type: 'string',
        description: 'The id of the element',
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
    @ApiNotFoundResponse({
        description: 'The stair does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'stair does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The stair has been successfully retrieved.',
        type: StairDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getStairByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getStairByElement(id);
    }  

}