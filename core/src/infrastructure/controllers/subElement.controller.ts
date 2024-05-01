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
    createElement(@Body() subElementDto: SubElementDto) {
        return this.service.createSubElement(subElementDto);
    }
    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getElement(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getSubElement(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateElement(@Param('id', ParseUUIDPipe) id: string, @Body() subElementDto: SubElementDto) {
        return this.service.updateSubElement(id, subElementDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getSubElementByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.findSubElementsByElement(id);
    } 

    @HttpCode(HttpStatus.OK)
    @Get(":id/related")
    getRelatedEntity(@Param('id', ParseUUIDPipe) id: string) {
        return this.service.getRelatedEntity(id);
    }

}