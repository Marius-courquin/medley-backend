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
    createFurnishing(@Body() furnishingDto: FurnishingDto) {
        return this.service.createFurnishing(furnishingDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getFurnishing(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getFurnishing(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateFurnishing(@Param('id', ParseUUIDPipe) id: string, @Body() furnishingDto: FurnishingDto) {
        return this.service.updateFurnishing(id, furnishingDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getFurnishingByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.findFurnishingByElement(id); 
    }

}