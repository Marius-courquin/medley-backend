import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { GenericSubElementService } from '@domain/services/genericSubElement.service';
import { GenericSubElementDto } from '@infrastructure/dtos/genericSubElement.dto';

@Controller('generic_sub_element')
export class GenericSubElementController {
    constructor(
        private service: GenericSubElementService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createGenericSubElement(@Body() genericSubElementDto: GenericSubElementDto) {
        return this.service.createGenericSubElement(genericSubElementDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getGenericSubElement(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getGenericSubElement(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateGenericSubElement(@Param('id', ParseUUIDPipe) id: string, @Body() genericSubElementDto: GenericSubElementDto) {
        return this.service.updateGenericSubElement(id, genericSubElementDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getGenericSubElementBySubElement(@Query('subElementId', ParseUUIDPipe) id: string) {
        return this.service.findGenericSubElementBySubElement(id);
    }  

}
