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
} from '@nestjs/common';
import { LeaseService } from '@domain/services/lease.service';
import { LeaseDto } from '@infrastructure/dtos/lease.dto';

@Controller('lease')
export class LeaseController {
  constructor(private service: LeaseService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createLease(@Body() leaseDto: LeaseDto) {
    return this.service.createLease(leaseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getLease(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.getLease(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateLease(@Param('id', ParseUUIDPipe) id: string, @Body() leaseDto: LeaseDto) {
    return this.service.updateLease(id, leaseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('by-agent/:agentId')
  getLeasesByAgent(@Param('agentId', ParseUUIDPipe) agentId: string) {
    return this.service.findByAgent(agentId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('by-tenant/:tenantId')
  getLeasesByTenant(@Param('tenantId', ParseUUIDPipe) tenantId: string) {
    return this.service.findByTenant(tenantId);
  }

  // You can add more endpoints as needed for your application's functionality
}
