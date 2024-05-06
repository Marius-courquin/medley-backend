import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { GroundService } from '@domain/services/ground.service';
import { GroundDto } from '@infrastructure/dtos/ground.dto';


@Controller('ground')
export class GroundController {
    constructor(
        private service: GroundService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() groundDto: GroundDto) {
        return this.service.create(groundDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() groundDto: GroundDto) {
        return this.service.update(id, groundDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getGroundByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getGroundByElement(id);
    }

}