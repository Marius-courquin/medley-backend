import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { FurnishingService } from '@domain/services/furnishing.service';
import { FurnishingDto } from '@infrastructure/dtos/furninshing.dto';


@Controller('furnishing')
export class FurnishingController {
    constructor(
        private service: FurnishingService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() furnishingDto: FurnishingDto) {
        return this.service.create(furnishingDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() furnishingDto: FurnishingDto) {
        return this.service.update(id, furnishingDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getFurnishingByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getFurnishingByElement(id); 
    }

}