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
    create(@Body() elementDto: ElementDto) {
        return this.service.create(elementDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() elementDto: ElementDto) {
        return this.service.update(id, elementDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getElementByRoom(@Query('roomId', ParseUUIDPipe) id: string) {
        return this.service.getElementByRoom(id);
    }   

    @HttpCode(HttpStatus.OK)
    @Get(":id/related")
    getRelatedEntity(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.getRelatedEntity(id);
}

}