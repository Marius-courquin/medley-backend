import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { WindowService } from '@domain/services/window.service';
import { WindowDto } from '@infrastructure/dtos/window.dto';

@Controller('window')
export class WindowController {
    constructor(
        private service: WindowService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() windowDto: WindowDto) {
        return this.service.create(windowDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() windowDto: WindowDto) {
        return this.service.update(id, windowDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getBySubElement(@Query('subElementId', ParseUUIDPipe) id: string) {
        return this.service.getBySubElement(id);
    }
}
