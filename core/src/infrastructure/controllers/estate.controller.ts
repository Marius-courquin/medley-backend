import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UseInterceptors
} from '@nestjs/common';
import {EstateService} from '@domain/services/estate.service';
import {EstateWithFileDto} from "@infrastructure/dtos/estateWithFile.dto";
import {FormDataRequest} from "nestjs-form-data";
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from "@nestjs/swagger";
import {ParseIntFieldsInterceptor} from "@infrastructure/interceptors/floatParser.interceptor";
import {EstateWithLinkDto} from "@infrastructure/dtos/estateWithLink.dto";

@ApiTags('Estate')
@ApiBearerAuth()
@Controller('estate')
export class EstateController {
    constructor(
        private service: EstateService,
    ) {}

    @ApiBody({
        type: EstateWithFileDto,
        description: 'The estate to create',
        required: true
    })
    @ApiCreatedResponse({
        description: 'The estate has been successfully created.',
        type: EstateWithLinkDto,
    })
    @ApiNotFoundResponse({
        description: 'The owner does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'third does not exist',
            },
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseInterceptors(new ParseIntFieldsInterceptor(['zipCode', 'floor', 'flatNumber', 'livingSpace', 'roomCount']))
    @FormDataRequest()
    async createEstate(@Body() estateDto: EstateWithFileDto): Promise<EstateWithLinkDto> {
        return this.service.createEstate(estateDto);
    }

    @ApiQuery({
        name: 'query',
        required: true,
        type: 'string',
        example: 'Beautiful house in Grazy Groove',
        description: 'The query to search for',
    })
    @ApiOkResponse({
        description: 'The estates have been successfully found.',
        isArray: true,
        type: EstateWithLinkDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    searchEstates(@Query('query') query: string): Promise<EstateWithLinkDto[]> {
        return this.service.search(query);
    }

    @ApiParam({
        name: 'ownerId',
        type: 'string',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'The id of the owner',
    })
    @ApiOkResponse({
        description: 'The estates have been successfully found.',
        isArray: true,
        type: EstateWithLinkDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get("owner/:ownerId")
    getEstateByOwner(@Param('ownerId', ParseUUIDPipe) id: string): Promise<EstateWithLinkDto[]> {
        return this.service.getByOwner(id);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'The id of the estate',
    })
    @ApiOkResponse({
        description: 'The estate has been successfully found.',
        type: EstateWithLinkDto,
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
    @Get(":id")
    getEstate(@Param('id', ParseUUIDPipe) id: string ): Promise<EstateWithLinkDto> {
        return this.service.getEstate(id);
    }

    @ApiBody({
        type: EstateWithFileDto,
        description: 'The estate to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        required: true,
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'The id of the estate to update',
    })
    @ApiNotFoundResponse({
        description: 'The owner does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'third related to ownerId does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The estate has been successfully updated.',
        type: EstateWithLinkDto,
    })
    @HttpCode(HttpStatus.OK)
    @Put(":id")
    @UseInterceptors(new ParseIntFieldsInterceptor(['zipCode', 'floor', 'flatNumber', 'livingSpace', 'roomCount']))
    @FormDataRequest()
    updateEstate(@Param('id', ParseUUIDPipe) id: string, @Body() estateDto: EstateWithFileDto): Promise<EstateWithLinkDto> {
        return this.service.updateEstate(id, estateDto);
    }

}