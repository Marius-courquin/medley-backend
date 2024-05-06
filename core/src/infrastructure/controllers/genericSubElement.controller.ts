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
    create(@Body() genericSubElementDto: GenericSubElementDto) {
        return this.service.create(genericSubElementDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() genericSubElementDto: GenericSubElementDto) {
        return this.service.update(id, genericSubElementDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getBySubElement(@Query('subElementId', ParseUUIDPipe) id: string) {
        return this.service.getBySubElement(id);
    }  

}
