import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { LeaseInspectionSubStepWithFileDto } from '@/infrastructure/dtos/leaseInspectionSubStepWithFile.dto';
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParseIntFieldsInterceptor } from '@infrastructure/interceptors/floatParser.interceptor';
import { FormDataRequest } from 'nestjs-form-data';
import { LeaseInspectionSubStepWithLinkDto } from "@infrastructure/dtos/leaseInspectionSubStepWithLink.dto";
import { LeaseInspectionSubStepService } from '@domain/services/leaseInspectionSubStep.service';


@ApiTags('lease_inspection/sub_step')
@Controller('lease_inspection/sub_step')
export class LeaseInspectionSubStepController {

    constructor(private service: LeaseInspectionSubStepService) {}

    @ApiBody({ 
        type: LeaseInspectionSubStepWithFileDto,
        description: 'The lease inspection step to create',
        required: true
    })
    @ApiCreatedResponse({ 
        description: 'The lease inspection step has been successfully created' ,
        type: LeaseInspectionSubStepWithFileDto
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
    create(@Body() leaseInspectionStepDto : LeaseInspectionSubStepWithFileDto) {
        return this.service.create(leaseInspectionStepDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection sub step',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The lease inspection sub step has been successfully found',
        type: LeaseInspectionSubStepWithFileDto
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection sub step does not exist',
        schema: {
            example: {
                message: 'The lease inspection sub step does not exist',
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
        name: 'leaseInspectionStepId',
        type: 'string',
        description: 'The id of the lease  step',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The lease inspection step has been successfully found',
        type: LeaseInspectionSubStepWithLinkDto
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
    @Get('step/:leaseInspectionStepId')
    getByLeaseInspetionStep(@Param('leaseInspectionStepId', ParseUUIDPipe) leaseInspectionStepId: string) {
        return this.service.getByLeaseInspectionStep(leaseInspectionStepId);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection sub step',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiBody({
        type: LeaseInspectionSubStepWithFileDto,
        description: 'The lease inspection sub step to update',
        required: true
    })
    @ApiOkResponse({
        description: 'The lease inspection sub step has been successfully updated',
        type: LeaseInspectionSubStepWithFileDto
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection sub step does not exist',
        schema: {
            example: {
                message: 'The lease inspection sub step does not exist',
                statusCode: 404
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put(':id')
    @UseInterceptors(new ParseIntFieldsInterceptor(['rating']))
    @FormDataRequest()
    update(@Param('id', ParseUUIDPipe) id: string, @Body() leaseInspectionStepDto: LeaseInspectionSubStepWithFileDto) {
        return this.service.update(id, leaseInspectionStepDto);
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