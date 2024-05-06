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

@Controller('lease')
export class LeaseController {
  constructor(private service: LeaseService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() leaseDto: LeaseDto) {
    return this.service.create(leaseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.get(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() leaseDto: LeaseDto) {
    return this.service.update(id, leaseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('by-agent/:agentId')
  getByAgent(@Param('agentId', ParseUUIDPipe) agentId: string) {
    return this.service.getByAgent(agentId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('by-tenant/:tenantId')
  getByTenant(@Param('tenantId', ParseUUIDPipe) tenantId: string) {
    return this.service.getByTenant(tenantId);
  }

}
