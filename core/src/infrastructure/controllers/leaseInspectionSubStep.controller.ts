import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { LeaseInspectionSubStepDto } from '@infrastructure/dtos/leaseInspectionSubStep.dto';
import { LeaseInspectionSubStepService } from '@domain/services/leaseInspectionSubStep.service';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags('lease_inspection/step/sub_step')
@Controller('lease_inspection/step/sub_step')
export class LeaseInspectionSubStepController {

    constructor(private service: LeaseInspectionSubStepService) {}

    @ApiBody({ 
        type: LeaseInspectionSubStepDto,
        description: 'The lease inspection step to create',
        required: true
    })
    @ApiCreatedResponse({ 
        description: 'The lease inspection step has been successfully created' ,
        type: LeaseInspectionSubStepDto
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
    create(@Body() leaseInspectionSubStepDto : LeaseInspectionSubStepDto) {
        return this.service.create(leaseInspectionSubStepDto);
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
        type: LeaseInspectionSubStepDto
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
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection sub step',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiBody({
        type: LeaseInspectionSubStepDto,
        description: 'The lease inspection sub step to update',
        required: true
    })
    @ApiOkResponse({
        description: 'The lease inspection sub step has been successfully updated',
        type: LeaseInspectionSubStepDto
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
    update(@Param('id', ParseUUIDPipe) id: string, @Body() leaseInspectionSubStepDto : LeaseInspectionSubStepDto) {
        return this.service.update(id, leaseInspectionSubStepDto);
    }

    @ApiParam({
        name: 'leaseId',
        type: 'string',
        description: 'The id of the lease inspection step',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The lease inspection sub step has been successfully found',
        type: LeaseInspectionSubStepDto
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
    @Get("lease_inspection_step/:stepId")
    getByLeaseInspectionStep(@Param('stepId', ParseUUIDPipe) stepId: string) {
        return this.service.getByLeaseInspectionStep(stepId);
    }

}