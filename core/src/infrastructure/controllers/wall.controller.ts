import {Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query} from '@nestjs/common';
import { WallDto } from '@infrastructure/dtos/wall.dto';
import { WallService } from '@domain/services/wall.service';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('Wall')
@Controller('wall')
export class WallController {
    constructor(
        private service: WallService,
    ) {}

    @ApiBody({
        type: WallDto,
        description: 'The wall to create',
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
        description: 'The element is not a wall',
        schema: {
            example: {
                statusCode: 400,
                message: 'element is not a wall',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The wall has been successfully created.',
        type: WallDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() wallDto: WallDto) {
        return this.service.create(wallDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the wall',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The wall does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'wall does not exist',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The wall has been successfully retrieved.',
        type: WallDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @ApiBody({
        type: WallDto,
        description: 'The wall to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the wall',
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
        description: 'The element is not a wall',
        schema: {
            example: {
                statusCode: 400,
                message: 'element is not a wall',
            },
        }
    })
    @ApiOkResponse({
        description: 'The wall has been successfully updated.',
        type: WallDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() wallDto: WallDto) {
        return this.service.update(id, wallDto);
    }

    @ApiQuery({
        name: 'elementId',
        type: 'string',
        description: 'The id of the element',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'No wall found for this element',
        schema: {
            example: {
                statusCode: 404,
                message: 'no wall found for this element',
            },
        }
    })
    @ApiOkResponse({
        description: 'The wall has been successfully found.',
        type: WallDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getWallByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getWallByElement(id);
    }

}