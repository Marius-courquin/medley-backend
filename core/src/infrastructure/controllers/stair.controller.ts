import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { StairService } from '@domain/services/stair.service';
import { StairDto } from '@infrastructure/dtos/stair.dto';


@Controller('stair')
export class StairController {
    constructor(
        private service: StairService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createStair(@Body() stairDto: StairDto) {
        return this.service.createStair(stairDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getStair(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getStair(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateStair(@Param('id', ParseUUIDPipe) id: string, @Body() stairDto: StairDto) {
        return this.service.updateStair(id, stairDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getStairByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.findStairByElement(id);
    }  

}