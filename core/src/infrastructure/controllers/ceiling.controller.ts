import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { CeilingService } from '@domain/services/ceiling.service';
import { CeilingDto } from '@infrastructure/dtos/ceiling.dto';


@Controller('ceiling')
export class CeilingController {
    constructor(
        private service: CeilingService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createCeiling(@Body() CeilingDto: CeilingDto) {
        return this.service.createCeiling(CeilingDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getCeiling(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getCeiling(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateCeiling(@Param('id', ParseUUIDPipe) id: string, @Body() CeilingDto: CeilingDto) {
        return this.service.updateCeiling(id, CeilingDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getCeilingByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.findCeilingByElement(id);
    }

}