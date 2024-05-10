import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { WindowService } from '@domain/services/window.service';
import { WindowDto } from '@infrastructure/dtos/window.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiParam, ApiQuery,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('Window')
@Controller('window')
export class WindowController {
    constructor(
        private service: WindowService,
    ) {}

    @ApiBody({
        type: WindowDto,
        description: 'The window to create',
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
        description: 'The sub element is not a window',
        schema: {
            example: {
                statusCode: 400,
                message: 'sub element is not a window',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The window has been successfully created.',
        type: WindowDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() windowDto: WindowDto) {
        return this.service.create(windowDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the window',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The window does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'window does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The window has been successfully retrieved.',
        type: WindowDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the window',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiBody({
        type: WindowDto,
        description: 'The window to update',
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
        description: 'The sub element is not a window',
        schema: {
            example: {
                statusCode: 400,
                message: 'sub element is not a window',
            },
        }
    })
    @ApiOkResponse({
        description: 'The window has been successfully updated.',
        type: WindowDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() windowDto: WindowDto) {
        return this.service.update(id, windowDto);
    }

    @ApiQuery({
        name: 'subElementId',
        type: 'string',
        description: 'The id of the sub element',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'No window found for this subElement',
        schema: {
            example: {
                statusCode: 404,
                message: 'no window found for this subElement',
            },
        }
    })
    @ApiOkResponse({
        description: 'The window has been successfully retrieved.',
        type: WindowDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getBySubElement(@Query('subElementId', ParseUUIDPipe) id: string) {
        return this.service.getBySubElement(id);
    }
}
