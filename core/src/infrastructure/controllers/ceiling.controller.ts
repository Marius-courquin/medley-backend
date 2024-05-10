import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CeilingService } from '@domain/services/ceiling.service';
import { CeilingDto } from '@infrastructure/dtos/ceiling.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiParam, ApiQuery,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('Ceiling')
@Controller('ceiling')
export class CeilingController {
    constructor(
        private service: CeilingService,
    ) {}

    @ApiBody({
        type: CeilingDto,
        description: 'The ceiling to create',
        required: true
    })
    @ApiCreatedResponse({
        description: 'The ceiling has been successfully created.',
        type: CeilingDto,
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
        description: 'The element is not a ceiling',
        schema: {
            example: {
                statusCode: 400,
                message: 'element is not a ceiling',
            },
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() CeilingDto: CeilingDto) {
        return this.service.create(CeilingDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the ceiling',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The ceiling has been successfully found.',
        type: CeilingDto
    })
    @ApiNotFoundResponse({
        description: 'The ceiling does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'ceiling does not exist',
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getCeiling(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @ApiBody({
        type: CeilingDto,
        description: 'The ceiling to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the ceiling to update',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The ceiling has been successfully updated.',
        type: CeilingDto
    })
    @ApiNotFoundResponse({
        description: 'The ceiling does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'ceiling does not exist',
            },
        }
    })
    @ApiBadRequestResponse({
        description: 'The element is not a ceiling',
        schema: {
            example: {
                statusCode: 400,
                message: 'element is not a ceiling',
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateCeiling(@Param('id', ParseUUIDPipe) id: string, @Body() CeilingDto: CeilingDto) {
        return this.service.update(id, CeilingDto);
    }

    @ApiQuery({
        name: 'elementId',
        type: 'string',
        description: 'The id of the element',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The ceiling has been successfully found.',
        type: CeilingDto
    })
    @ApiNotFoundResponse({
        description: 'No ceiling found for this element',
        schema: {
            example: {
                statusCode: 404,
                message: 'no ceiling found for this element',
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getCeilingByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getCeilingByElement(id);
    }

}