import {Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query} from '@nestjs/common';
import { LeaseInspectionService } from '@domain/services/leaseInspection.service';
import { LeaseInspectionDto } from '@infrastructure/dtos/leaseInspection.dto';
import { Agent } from "@infrastructure/decorators/agent.decorator";
import { AgentDto } from '@infrastructure/dtos/agent.dto';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {LeaseInspectionContextDto} from "@infrastructure/dtos/leaseInspectionContextDto";
import { SignatureService } from '@/domain/services/signature.service';
import { SignatureWithLinkDto } from '../dtos/signatureWithLink.dto';
import {SignatureWithFileDto} from "@infrastructure/dtos/signatureWithFile.dto";
import {FormDataRequest} from "nestjs-form-data";

@ApiTags('Lease Inspection')
@Controller('lease_inspection')
export class LeaseInspectionController {

    constructor(
        private service: LeaseInspectionService,
    ) {}

    @ApiBody({
        type: LeaseInspectionDto,
        description: 'The lease inspection to create',
        required: true
    })
    @ApiNotFoundResponse({
        description: 'The lease does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'lease does not exist',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The lease inspection has been successfully created.',
        type: LeaseInspectionDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() leaseInspectionDto : LeaseInspectionDto, @Agent() agent : AgentDto) {
        leaseInspectionDto.agentId = agent.id;
        return this.service.create(leaseInspectionDto);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'lease inspection does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The lease inspection has been successfully retrieved.',
        type: LeaseInspectionDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    get(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.get(id);
    }

    @ApiBody({
        type: LeaseInspectionDto,
        description: 'The lease inspection to update',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The lease does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'lease does not exist',
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() leaseInspectionDto: LeaseInspectionDto, @Agent() agent: AgentDto) {
        leaseInspectionDto.agentId = agent.id;
        return this.service.update(id, leaseInspectionDto);
    }

    @ApiQuery({
        name: 'leaseId',
        type: 'string',
        description: 'The id of the lease',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiOkResponse({
        description: 'The lease inspections have been successfully retrieved.',
        type: LeaseInspectionDto,
        isArray: true
    })
    @ApiNotFoundResponse({
        description: 'The lease does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'lease does not exist',
            },
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getByLease(@Query('leaseId', ParseUUIDPipe) leaseId: string) {
        return this.service.getByLease(leaseId);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'lease inspection does not exist',
            },
        }
    })
    @ApiUnauthorizedResponse({
        description: 'The lease inspection is already closed',
        schema: {
            example: {
                statusCode: 401,
                message: 'lease inspection already closed',
            },
        }
    })
    @ApiUnauthorizedResponse({
        description: 'The lease inspection is not started yet',
        schema: {
            example: {
                statusCode: 401,
                message: 'lease inspection not started yet',
            },
        }
    })
    @ApiUnauthorizedResponse({
        description: 'The lease inspection is not fully signed',
        schema: {
            example: {
                statusCode: 401,
                message: 'lease inspection not fully signed',
            },
        }
    })
    @ApiOkResponse({
        description: 'The lease inspection has been successfully closed.',
        type: LeaseInspectionDto,
    })
    @HttpCode(HttpStatus.OK)
    @Post(':id/closure')
    close(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.close(id);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'lease inspection does not exist',
            },
        }
    })
    @ApiUnauthorizedResponse({
        description: 'The lease inspection is already closed',
        schema: {
            example: {
                statusCode: 401,
                message: 'lease inspection already closed',
            },
        }
    })
    @ApiOkResponse({
        description: 'The lease inspection has been successfully started.',
        type: LeaseInspectionDto,
    })
    @HttpCode(HttpStatus.OK)
    @Post(':id/start')
    start(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.start(id);
    }

    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'lease inspection does not exist',
            },
        }
    })
    @ApiOkResponse({
        description: 'The lease inspection context has been successfully retrieved.',
        type: LeaseInspectionContextDto,
    })
    @HttpCode(HttpStatus.OK)
    @Get(':id/context')
    getContext(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.getContext(id);
    }

    @ApiBody({
        type: SignatureWithFileDto,
        description: 'The signature to create',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'lease inspection does not exist',
            },
        }
    })
    @ApiUnauthorizedResponse({
        description: 'The lease inspection has already been signed by the tenant',
        schema: {
            example: {
                statusCode: 401,
                message: 'lease inspection already signed by tenant',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The agent signature has been successfully created.',
        type: SignatureWithLinkDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post(':id/signature/agent')
    @FormDataRequest()
    signByAgent(@Param('id', ParseUUIDPipe) id: string, @Body() signatureWithFileDto : SignatureWithFileDto) {
        return this.service.signByAgent(id, signatureWithFileDto);
    }

    @ApiBody({
        type: SignatureWithFileDto,
        description: 'The signature to create',
        required: true
    })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'The id of the lease inspection',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'The lease inspection does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'lease inspection does not exist',
            },
        }
    })
    @ApiUnauthorizedResponse({
        description: 'The lease inspection has already been signed by the tenant',
        schema: {
            example: {
                statusCode: 401,
                message: 'lease inspection already signed by tenant',
            },
        }
    })
    @ApiCreatedResponse({
        description: 'The tenant signature has been successfully created.',
        type: SignatureWithLinkDto,
    })
    @HttpCode(HttpStatus.CREATED)
    @Post(':id/signature/tenant')
    @FormDataRequest()
    signByTenant(@Param('id', ParseUUIDPipe) id: string, @Body() signatureWithFileDto : SignatureWithFileDto) {
        return this.service.signByTenant(id, signatureWithFileDto);
    }

}