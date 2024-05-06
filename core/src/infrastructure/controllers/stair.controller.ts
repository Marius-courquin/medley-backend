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
    create(@Body() stairDto: StairDto) {
        return this.service.create(stairDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() stairDto: StairDto) {
        return this.service.update(id, stairDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getStairByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getStairByElement(id);
    }  

}