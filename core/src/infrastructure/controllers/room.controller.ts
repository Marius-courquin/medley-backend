import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import {RoomDto} from "@infrastructure/dtos/room.dto"
import { RoomService } from "@domain/services/room.service";
import {
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('Room')
@Controller('room')
export class RoomController {
    constructor(
        private service: RoomService,
    ) {}

    @ApiBody({
        type: RoomDto,
        description: 'The room to create',
        required: true
    })
    @ApiNotFoundResponse({
        description: 'The estate does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'estate does not exist',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The room has been successfully created.',
        type: RoomDto
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() roomDto: RoomDto) {
        return this.service.create(roomDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the room',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The room does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'room does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The room has been successfully retrieved.',
        type: RoomDto
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param("id", ParseUUIDPipe) id:string) {
        return this.service.get(id);
    }

    @ApiBody({
        type: RoomDto,
        description: 'The room to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the room',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The estate does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'estate does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The room has been successfully updated.',
        type: RoomDto
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param("id", ParseUUIDPipe) id:string, @Body() roomDto: RoomDto) {
        return this.service.update(roomDto);
    }

    @ApiQuery({
        name: 'estateId',
        type: 'string',
        description: 'The id of the estate',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The rooms have been successfully retrieved.',
        type: RoomDto,
        isArray: true
    })
    @ApiNotFoundResponse({
        description: 'The estate does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'estate does not exist',
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getAllForEstate(@Query("estateId", ParseUUIDPipe) estateId:string) {
        return this.service.getAllForEstate(estateId);
    }
}