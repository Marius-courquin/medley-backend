import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { GenericSubElementService } from '@domain/services/genericSubElement.service';
import { GenericSubElementDto } from '@infrastructure/dtos/genericSubElement.dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiParam, ApiQuery,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('Generic Sub Element')
@Controller('generic_sub_element')
export class GenericSubElementController {
    constructor(
        private service: GenericSubElementService,
    ) {}

    @ApiBody({
        type: GenericSubElementDto,
        description: 'The generic sub element to create',
        required: true
    })
    @ApiNotFoundResponse({
        description: 'The sub element does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'subElement does not exist',
            },
        }
    })
    @ApiBadRequestResponse({
        description: 'The sub element is not a generic sub element',
        schema: {
            example: {
                statusCode: 400,
                message: 'subElement is not a generic sub element',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The generic sub element has been successfully created.',
        type: GenericSubElementDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() genericSubElementDto: GenericSubElementDto) {
        return this.service.create(genericSubElementDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the generic sub element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiNotFoundResponse({
        description: 'The generic sub element does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'genericSubElement does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The generic sub element has been successfully retrieved.',
        type: GenericSubElementDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @ApiBody({
        type: GenericSubElementDto,
        description: 'The generic sub element to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the generic sub element',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The subElement does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'subElement does not exist',
            },
        }
    })
    @ApiBadRequestResponse({
        description: 'The subElement is not a generic sub element',
        schema: {
            example: {
                statusCode: 400,
                message: 'subElement is not a generic sub element',
            },
        }
    })
    @ApiOkResponse({
        description: 'The generic sub element has been successfully updated.',
        type: GenericSubElementDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() genericSubElementDto: GenericSubElementDto) {
        return this.service.update(id, genericSubElementDto);
    }

    @ApiQuery({
        name: 'subElementId',
        type: 'string',
        description: 'The id of the sub element',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiNotFoundResponse({
        description: 'No genericSubElement found for this subElement',
        schema: {
            example: {
                statusCode: 404,
                message: 'no genericSubElement found for this subElement',
            },
        }
    })
    @ApiOkResponse({
        description: 'The generic sub element has been successfully found.',
        type: GenericSubElementDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getBySubElement(@Query('subElementId', ParseUUIDPipe) id: string) {
        return this.service.getBySubElement(id);
    }  

}
