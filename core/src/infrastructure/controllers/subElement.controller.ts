import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { SubElementService } from '@domain/services/subElement.service';
import { SubElementDto } from '@/infrastructure/dtos/subElement.dto';


@Controller('sub_element')
export class SubElementController {
    constructor(
        private service: SubElementService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() subElementDto: SubElementDto) {
        return this.service.create(subElementDto);
    }
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateElement(@Param('id', ParseUUIDPipe) id: string, @Body() subElementDto: SubElementDto) {
        return this.service.update(id, subElementDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getByElement(id);
    } 

    @HttpCode(HttpStatus.OK)
    @Get(":id/related")
    getRelatedEntity(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.getRelatedEntity(id);
    }

}