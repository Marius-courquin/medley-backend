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
    createWindow(@Body() windowDto: WindowDto) {
        return this.service.createWindow(windowDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getWindow(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getWindow(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateWindow(@Param('id', ParseUUIDPipe) id: string, @Body() windowDto: WindowDto) {
        return this.service.updateWindow(id, windowDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getWindowBySubElement(@Query('subElementId', ParseUUIDPipe) id: string) {
        return this.service.findWindowBySubElement(id);
    }
}
