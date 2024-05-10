import {Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put} from '@nestjs/common';
import {ThirdService} from '@domain/services/third.service';
import {ThirdDto} from "@infrastructure/dtos/third.dto";
import {ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags} from "@nestjs/swagger";

@ApiTags('Third')
@Controller('third')
export class ThirdController {
    constructor(
        private service: ThirdService,
    ) {}

    @ApiBody({
        type: ThirdDto,
        description: 'The third to create',
        required: true
    })
    @ApiCreatedResponse({
        description: 'The third has been successfully created.',
        type: ThirdDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createThird(@Body() thirdDto: ThirdDto) {
        return this.service.createThird(thirdDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the third',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The third does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'third does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The third has been successfully retrieved.',
        type: ThirdDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getThird(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.getThird(id);
    }

    @ApiBody({
        type: ThirdDto,
        description: 'The third to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the third',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The third has been successfully updated.',
        type: ThirdDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateThird(@Param('id', ParseUUIDPipe) id: string, @Body() thirdDto: ThirdDto) {
        return this.service.updateThird(id, thirdDto);
    }

}

