import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Req } from '@nestjs/common';
import { LeaseInspectionService } from '@domain/services/leaseInspection.service';
import { LeaseInspectionDto } from '@infrastructure/dtos/leaseInspection.dto';
import { Agent } from "@infrastructure/decorators/agent.decorator";
import { AgentDto } from '@infrastructure/dtos/agent.dto';
  
@Controller('lease_inspection')
export class LeaseInspectionController {

    constructor(private service: LeaseInspectionService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() leaseInspectionDto : LeaseInspectionDto, @Agent() agent : AgentDto) {
        leaseInspectionDto.agentId = agent.id;
        return this.service.create(leaseInspectionDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    get(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() leaseInspectionDto: LeaseInspectionDto, @Agent() agent: AgentDto) {
        leaseInspectionDto.agentId = agent.id;
        return this.service.update(id, leaseInspectionDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get("lease/:leaseId")
    getByLease(@Param('leaseId', ParseUUIDPipe) leaseId: string) {
        return this.service.getByLease(leaseId);
    }

}