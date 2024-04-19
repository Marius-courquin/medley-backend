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
    createWall(@Body() wallDto: WallDto) {
        return this.service.createWall(wallDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get(":id")
    getWall(@Param('id', ParseUUIDPipe) id: string ) {
        return this.service.getWall(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put(":id")
    updateWall(@Param('id', ParseUUIDPipe) id: string, @Body() wallDto: WallDto) {
        return this.service.updateWall(id, wallDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getWallByElement(@Query('elementId', ParseUUIDPipe) id: string) {
        return this.service.findWallByElement(id);
    }

}