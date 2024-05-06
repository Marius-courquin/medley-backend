import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { LeaseInspectionStepDto } from '@infrastructure/dtos/leaseInspectionStep.dto';
import { LeaseInspectionStepService } from '@domain/services/leaseInspectionStep.service';
  
@Controller('lease_inspection/step')
export class LeaseInspectionStepController {

    constructor(private service: LeaseInspectionStepService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() leaseInspectionStepDto : LeaseInspectionStepDto) {
        return this.service.create(leaseInspectionStepDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    get(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() leaseInspectionStepDto : LeaseInspectionStepDto) {
        return this.service.update(id, leaseInspectionStepDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get("lease_inspection/:leaseId")
    getByLeaseInspetion(@Param('leaseId', ParseUUIDPipe) leaseId: string) {
        return this.service.getByLeaseInspection(leaseId);
    }

}