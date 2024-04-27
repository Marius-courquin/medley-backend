import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ElementService } from '@domain/services/element.service';
import { ElementDto } from '@infrastructure/dtos/element.dto';


@Controller('element')
export class ElementController {
    constructor(
        private service: ElementService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createElement(@Body() elementDto: ElementDto) {
        return this.service.createElement(elementDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getElement(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getElement(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateElement(@Param('id', ParseUUIDPipe) id: string, @Body() elementDto: ElementDto) {
        return this.service.updateElement(id, elementDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getElementByRoom(@Query('roomId', ParseUUIDPipe) id: string) {
        return this.service.findElementByRoom(id);
    }   

    @HttpCode(HttpStatus.OK)
    @Get(":id/related")
    getRelatedEntity(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.getRelatedEntity(id);
}

}