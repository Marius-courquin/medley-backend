import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query} from '@nestjs/common';
import {EstateService} from '@domain/services/estate.service';
import {EstateDto} from "@infrastructure/dtos/estate.dto";


@Controller('estate')
export class EstateController {
    constructor(
        private service: EstateService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createEstate(@Body() estateDto: EstateDto) {
        return this.service.createEstate(estateDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getEstate(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getEstate(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateEstate(@Param('id', ParseUUIDPipe) id: string, @Body() estateDto: EstateDto) {
        return this.service.updateEstate(id, estateDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getEstateByOwner(@Query('ownerId', ParseUUIDPipe) id: string) {
        return this.service.findByOwner(id);
    }   

}