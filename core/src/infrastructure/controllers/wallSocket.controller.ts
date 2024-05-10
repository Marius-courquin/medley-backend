import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { WallSocketService } from '@domain/services/wallSocket.service';
import { WallSocketDto } from '@infrastructure/dtos/wallSocket.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiParam, ApiQuery,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('Wall Socket')
@Controller('wall_socket')
export class WallSocketController {
    constructor(
        private service: WallSocketService,
    ) {}

    @ApiBody({
        type: WallSocketDto,
        description: 'The wall socket to create',
        required: true
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
    @ApiBadRequestResponse({
        description: 'The sub element is not a wall socket',
        schema: {
            example: {
                statusCode: 400,
                message: 'sub element is not a wall socket',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The wall socket has been successfully created.',
        type: WallSocketDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createWallSocket(@Body() wallSocketDto: WallSocketDto) {
        return this.service.create(wallSocketDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the wall socket',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The wall socket does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'wall socket does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The wall socket has been successfully retrieved.',
        type: WallSocketDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getWallSocket(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @ApiBody({
        type: WallSocketDto,
        description: 'The wall socket to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the wall socket',
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
    @ApiBadRequestResponse({
        description: 'The sub element is not a wall socket',
        schema: {
            example: {
                statusCode: 400,
                message: 'sub element is not a wall socket',
            },
        }
    })
    @ApiOkResponse({
        description: 'The wall socket has been successfully updated.',
        type: WallSocketDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() wallSocketDto: WallSocketDto) {
        return this.service.update(id, wallSocketDto);
    }

    @ApiQuery({
        name: 'subElementId',
        type: 'string',
        description: 'The id of the sub element',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The wall socket has been successfully retrieved.',
        type: WallSocketDto
    })
    @ApiNotFoundResponse({
        description: 'No wall socket found for this subElement',
        schema: {
            example: {
                statusCode: 404,
                message: 'no wall socket found for this subElement',
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getBySubElement(@Query('subElementId', ParseUUIDPipe) id: string) {
        return this.service.getBySubElement(id);
    }

}
