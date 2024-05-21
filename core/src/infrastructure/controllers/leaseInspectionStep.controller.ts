import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { LeaseInspectionStepWithFileDto } from '@/infrastructure/dtos/leaseInspectionStepWithFile.dto';
import { LeaseInspectionStepService } from '@domain/services/leaseInspectionStep.service';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParseIntFieldsInterceptor } from '@infrastructure/interceptors/floatParser.interceptor';
import { FormDataRequest } from 'nestjs-form-data';
import { LeaseInspectionStepWithLinkDto } from '../dtos/leaseInspectionStepWithLink.dto';


@ApiTags('lease_inspection/step')
@Controller('lease_inspection/step')
export class LeaseInspectionStepController {

    constructor(private service: LeaseInspectionStepService) {}

    @ApiBody({ 
        type: LeaseInspectionStepWithFileDto,
        description: 'The lease inspection step to create',
        required: true
    })
    @ApiCreatedResponse({ 
        description: 'The lease inspection step has been successfully created' ,
        type: LeaseInspectionStepWithLinkDto
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection step does not exist',
        schema : {
            example: {
                message: 'The lease inspection step does not exist',
                statusCode: 404
            }
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @UseInterceptors(new ParseIntFieldsInterceptor(['rating']))
    @FormDataRequest()
    create(@Body() leaseInspectionStepDto : LeaseInspectionStepWithFileDto) {
        return this.service.create(leaseInspectionStepDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection step',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The lease inspection step has been successfully found',
        type: LeaseInspectionStepWithLinkDto
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection step does not exist',
        schema: {
            example: {
                message: 'The lease inspection step does not exist',
                statusCode: 404
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    get(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.get(id);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection step',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiBody({
        type: LeaseInspectionStepWithFileDto,
        description: 'The lease inspection step to update',
        required: true
    })
    @ApiOkResponse({
        description: 'The lease inspection step has been successfully updated',
        type: LeaseInspectionStepWithLinkDto
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection step does not exist',
        schema: {
            example: {
                message: 'The lease inspection step does not exist',
                statusCode: 404
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put(':id')
    @UseInterceptors(new ParseIntFieldsInterceptor(['state', 'description', 'rating']))
    @FormDataRequest()
    update(@Param('id', ParseUUIDPipe) id: string, @Body() leaseInspectionStepDto : LeaseInspectionStepWithFileDto) {
        return this.service.update(id, leaseInspectionStepDto);
    }

    @ApiParam({
        name: 'leaseId',
        type: 'string',
        description: 'The id of the lease inspection',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The lease inspection step has been successfully found',
        type: LeaseInspectionStepWithLinkDto
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection step does not exist',
        schema: {
            example: {
                message: 'The lease inspection step does not exist',
                statusCode: 404
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get("lease_inspection/:leaseId")
    getByLeaseInspetion(@Param('leaseId', ParseUUIDPipe) leaseId: string) {
        return this.service.getByLeaseInspection(leaseId);
    }


    @ApiParam({
        name: 'picturesId',
        type: 'string',
        description: 'The id of the picture',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNoContentResponse({
        description: 'The picture has been successfully deleted'
    })
    @ApiNotFoundResponse({
        description: 'The picture does not exist',
        schema: {
            example: {
                message: 'The picture does not exist',
                statusCode: 404
            }
        }
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete("picture/:picturesId")
    deletePicturesByPictureId(@Param('picturesId', ParseUUIDPipe) picturesId: string) {
        return this.service.deletePicturesByPictureId(picturesId);
    }


}