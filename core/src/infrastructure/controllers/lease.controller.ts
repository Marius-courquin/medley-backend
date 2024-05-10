import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put, Query,

} from '@nestjs/common';
import { LeaseService } from '@domain/services/lease.service';
import { LeaseDto } from '@infrastructure/dtos/lease.dto';
import { Agent } from "@infrastructure/decorators/agent.decorator";
import { AgentDto } from '@infrastructure/dtos/agent.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";

@ApiTags('Lease')
@Controller('lease')
export class LeaseController {
  constructor(private service: LeaseService) {}

  @ApiBody({
    type: LeaseDto,
    description: 'The lease to create',
    required: true
  })
  @ApiNotFoundResponse({
    description: 'The tenant does not exist',
    schema: {
      example: {
        statusCode: 404,
        message: 'tenant does not exist',
      },
    }
  })
  @ApiNotFoundResponse({
    description: 'The estate does not exist',
    schema: {
      example: {
        statusCode: 400,
        message: 'estate does not exist',
      },
    }
  })
  @ApiCreatedResponse({
    description: 'The lease has been successfully created.',
    type: LeaseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() leaseDto: LeaseDto, @Agent() agent : AgentDto) { 
    leaseDto.agentId = agent.id;
    return this.service.create(leaseDto);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The id of the lease',
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
  @ApiOkResponse({
    description: 'The lease has been successfully found.',
    type: LeaseDto
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.get(id);
  }

  @ApiBody({
    type: LeaseDto,
    description: 'The lease to update',
    required: true
  })
  @ApiParam({
      name: 'id',
      type: 'string',
      description: 'The id of the lease',
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426614174000',
      required: true,
  })
  @ApiNotFoundResponse({
    description: 'The tenant does not exist',
    schema: {
      example: {
        statusCode: 404,
        message: 'tenant does not exist',
      },
    }
  })
  @ApiNotFoundResponse({
    description: 'The estate does not exist',
    schema: {
      example: {
        statusCode: 400,
        message: 'estate does not exist',
      },
    }
  })
  @ApiOkResponse({
    description: 'The lease has been successfully updated.',
    type: LeaseDto
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() leaseDto: LeaseDto, @Agent() agent: AgentDto) {
    leaseDto.agentId = agent.id;
    return this.service.update(id, leaseDto);
  }

  @ApiParam({
      name: 'tenantId',
      type: 'string',
      description: 'The id of the tenant',
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426614174000',
      required: true,
  })

  @ApiQuery({
    name: 'tenantId',
    type: 'string',
    description: 'The id of the tenant',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @ApiOkResponse({
      description: 'The leases have been successfully found.',
      type: LeaseDto,
      isArray: true
  })
  @ApiNotFoundResponse({
        description: 'The tenant does not exist',
        schema: {
            example: {
                statusCode: 404,
                message: 'tenant does not exist',
            },
        }
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getByTenant(@Query('tenantId', ParseUUIDPipe) tenantId: string) {
    return this.service.getByTenant(tenantId);
  }

}
