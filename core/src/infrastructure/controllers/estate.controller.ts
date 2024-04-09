import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
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
    getEstate(@Param() param: any) {
        return this.service.getEstate(param.id);
    }

 
    @HttpCode(HttpStatus.OK)
    @Get()
    getEstateByOwner(@Query('ownerId') id: string) {
        return this.service.findByOwner(id);
    }   

    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    delete(@Param() id: string) {
        return this.service.deleteEstate(id);
    }



}