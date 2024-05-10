import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { LeaseInspectionStepDto } from '@infrastructure/dtos/leaseInspectionStep.dto';
import { LeaseInspectionStepService } from '@domain/services/leaseInspectionStep.service';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags('lease_inspection/step')
@Controller('lease_inspection/step')
export class LeaseInspectionStepController {

    constructor(private service: LeaseInspectionStepService) {}

    @ApiBody({ 
        type: LeaseInspectionStepDto,
        description: 'The lease inspection step to create',
        required: true
    })
    @ApiCreatedResponse({ 
        description: 'The lease inspection step has been successfully created' ,
        type: LeaseInspectionStepDto
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
    create(@Body() leaseInspectionStepDto : LeaseInspectionStepDto) {
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
        type: LeaseInspectionStepDto
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
        type: LeaseInspectionStepDto,
        description: 'The lease inspection step to update',
        required: true
    })
    @ApiOkResponse({
        description: 'The lease inspection step has been successfully updated',
        type: LeaseInspectionStepDto
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
    update(@Param('id', ParseUUIDPipe) id: string, @Body() leaseInspectionStepDto : LeaseInspectionStepDto) {
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
        type: LeaseInspectionStepDto
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

}