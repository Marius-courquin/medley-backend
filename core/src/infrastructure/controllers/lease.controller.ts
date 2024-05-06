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

} from '@nestjs/common';
import { LeaseService } from '@domain/services/lease.service';
import { LeaseDto } from '@infrastructure/dtos/lease.dto';
import { Agent } from "@infrastructure/decorators/agent.decorator";
import { AgentDto } from '@infrastructure/dtos/agent.dto';

@Controller('lease')
export class LeaseController {
  constructor(private service: LeaseService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() leaseDto: LeaseDto, @Agent() agent : AgentDto) { 
    leaseDto.agentId = agent.id;
    return this.service.create(leaseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.get(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() leaseDto: LeaseDto, @Agent() agent: AgentDto) {
    leaseDto.agentId = agent.id;
    return this.service.update(id, leaseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('by-tenant/:tenantId')
  getByTenant(@Param('tenantId', ParseUUIDPipe) tenantId: string) {
    return this.service.getByTenant(tenantId);
  }

}
