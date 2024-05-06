import {Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query} from '@nestjs/common';
import { WallDto } from '@infrastructure/dtos/wall.dto';
import { WallService } from '@domain/services/wall.service';


@Controller('wall')
export class WallController {
    constructor(
        private service: WallService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() wallDto: WallDto) {
        return this.service.create(wallDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    get(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.get(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    update(@Param('id', ParseUUIDPipe) id: string, @Body() wallDto: WallDto) {
        return this.service.update(id, wallDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getWallByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.getWallByElement(id);
    }

}